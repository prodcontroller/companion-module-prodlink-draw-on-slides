import {
	InstanceBase,
	InstanceStatus,
	type SomeCompanionConfigField,
	type JsonObject,
} from '@companion-module/base'
import { getActions } from './actions.js'
import { getVariables } from './variables.js'
import { getPresets, getPresetSections } from './presets.js'
import { getFeedbacks } from './feedbacks.js'
import { SlideDrawAPI, type PresetState, type SlideState, type ConnectionState, type SettingsState } from './api.js'
import { brushTypeEmoji } from './variables.js'

interface ModuleConfig {
	ipad: string // bonjour-device field: "ip:port" or manual entry
	host: string
	port: number
	pollInterval: number
}

export default class SlideDrawInstance extends InstanceBase {
	public api!: SlideDrawAPI
	private pollTimer: ReturnType<typeof setTimeout> | null = null
	private isPolling = false
	private consecutiveFailures = 0
	private configuredHost = '192.168.1.100'
	private configuredPort = 8080

	// Cached state for variables and feedbacks
	public presetState: PresetState | null = null
	public slideState: SlideState | null = null
	public connectionState: ConnectionState | null = null
	public settingsState: SettingsState | null = null

	async init(rawConfig: JsonObject): Promise<void> {
		const config = rawConfig as unknown as ModuleConfig
		this.log('info', 'Initializing ProdLink: Draw on Slides module')

		try {
			const { host, port } = this.resolveHostPort(config)
			this.configuredHost = host
			this.configuredPort = port
			this.api = new SlideDrawAPI(host, port)
			this.setActionDefinitions(getActions(this))
			this.setVariableDefinitions(getVariables())
			this.setPresetDefinitions(getPresetSections(), getPresets())
			this.setFeedbackDefinitions(getFeedbacks(this))
		} catch (e) {
			this.log('error', `Init error: ${e}`)
		}

		await this.configUpdated(rawConfig)
	}

	async configUpdated(rawConfig: JsonObject): Promise<void> {
		const config = rawConfig as unknown as ModuleConfig
		try {
			const { host, port } = this.resolveHostPort(config)
			this.configuredHost = host
			this.configuredPort = port
			this.api.updateConfig(host, port)
			this.consecutiveFailures = 0
		} catch (e) {
			this.log('error', `Config update error: ${e}`)
		}

		// Stop existing poll
		if (this.pollTimer) {
			clearTimeout(this.pollTimer)
			this.pollTimer = null
		}

		// Don't aggressively test connection on startup — let polling handle auto-connect
		this.updateStatus(InstanceStatus.Connecting, 'Waiting for connection...')

		// Start polling — first successful poll will set status to Ok
		const interval = Math.max(config.pollInterval || 1500, 500)
		this.startPolling(interval)
	}

	async destroy(): Promise<void> {
		if (this.pollTimer) {
			clearTimeout(this.pollTimer)
			this.pollTimer = null
		}
		this.log('info', 'Draw on Slides module destroyed')
	}

	/**
	 * Resolve host and port from config.
	 * Priority: bonjour-device field (ipad) > manual host/port fields.
	 * Bonjour device format is "ip:port" (e.g. "192.168.1.50:8082").
	 */
	private resolveHostPort(config: ModuleConfig): { host: string; port: number } {
		// If bonjour-device was selected, it provides "ip:port"
		if (config.ipad && config.ipad !== 'manual' && config.ipad.includes(':')) {
			const [host, portStr] = config.ipad.split(':')
			const port = parseInt(portStr)
			if (host && !isNaN(port)) {
				this.log('info', `Using Bonjour-discovered device: ${host}:${port}`)
				return { host, port }
			}
		}

		// Fall back to manual config
		return {
			host: config.host || '192.168.1.100',
			port: config.port || 8080,
		}
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return [
			{
				type: 'bonjour-device',
				id: 'ipad',
				label: 'iPad (Auto-Discover)',
				width: 12,
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'iPad IP Address (manual)',
				width: 8,
				default: '192.168.1.100',
			},
			{
				type: 'number',
				id: 'port',
				label: 'Port (manual)',
				width: 4,
				default: 8080,
				min: 1,
				max: 65535,
			},
			{
				type: 'number',
				id: 'pollInterval',
				label: 'Poll Interval (ms) — Lower = faster feedback, higher = less iPad load',
				width: 6,
				default: 1500,
				min: 500,
				max: 30000,
			},
		]
	}

	private startPolling(interval: number): void {
		// Sequential polling: wait for poll to finish, then wait the interval, then poll again.
		const scheduleNext = () => {
			this.pollTimer = setTimeout(async () => {
				if (this.isPolling) return
				this.isPolling = true
				try {
					await this.pollState()
				} finally {
					this.isPolling = false
				}
				scheduleNext()
			}, interval)
		}

		// Immediate first poll — protected with isPolling guard and error handling
		if (this.isPolling) return
		this.isPolling = true
		this.pollState()
			.catch((e) => this.log('warn', `Initial poll failed: ${e}`))
			.finally(() => {
				this.isPolling = false
				scheduleNext()
			})
	}

	/**
	 * When polling fails repeatedly, scan ports 8080-8090 on the same host
	 * to auto-find the iPad if it restarted on a different port.
	 */
	private async scanForNewPort(): Promise<boolean> {
		const portsToTry = [8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088, 8089, 8090]

		for (const port of portsToTry) {
			if (port === this.configuredPort) continue // Skip the one that's already failing

			try {
				const testApi = new SlideDrawAPI(this.configuredHost, port)
				const connected = await testApi.testConnection()
				if (connected) {
					this.log('info', `🔍 Auto-discovered iPad on new port ${port} (was ${this.configuredPort})`)
					this.configuredPort = port
					this.api.updateConfig(this.configuredHost, port)
					this.consecutiveFailures = 0
					return true
				}
			} catch {
				// Port not responding, try next
			}
		}

		return false
	}

	private async pollState(): Promise<void> {
		try {
			// Single consolidated API call instead of 4 separate ones
			const state = await this.api.getState()

			// Success — reset failure counter and set status
			this.consecutiveFailures = 0
			this.updateStatus(InstanceStatus.Ok)

			// Cache state for feedbacks
			this.presetState = state.preset
			this.slideState = state.slide
			this.connectionState = state.connection as ConnectionState
			this.settingsState = state.settings

			const preset = state.preset
			const slide = state.slide
			const connection = state.connection
			const settings = state.settings

			// Update all variables in one call
			const vars: Record<string, string> = {
				active_preset: String(preset.activePreset),
				brush_type: preset.brushType,
				color: preset.color,
				size: String(preset.size),
				opacity: String(preset.opacity),
				is_eraser: preset.isEraser ? 'Yes' : 'No',
				slide_index: String(slide.currentSlideIndex),
				presentation_name: slide.presentationName || 'None',
				connection_status: connection.status,
				propresenter_ip: connection.ip,
				// Settings
				clear_on_slide: settings.clearOnSlideChange ? 'ON' : 'OFF',
				finger_drawing: settings.allowFingerDrawing ? 'ON' : 'OFF',
				swipe_nav: settings.swipeNavigationEnabled ? 'ON' : 'OFF',
				reset_zoom_slide: settings.resetZoomOnSlideChange ? 'ON' : 'OFF',
				show_timer: settings.showTimer ? 'ON' : 'OFF',
				show_stage_msgs: settings.showStageMessages ? 'ON' : 'OFF',
				prev_next_btns: settings.prevNextButtonsEnabled ? 'ON' : 'OFF',
				thumb_nav: settings.thumbnailNavigationEnabled ? 'ON' : 'OFF',
				show_labels: settings.showSlideLabels ? 'ON' : 'OFF',
				// Zoom & drawing state
				is_zoomed: preset.isZoomed ? 'Zoomed' : 'Normal',
				has_drawing: preset.hasDrawing ? 'Yes' : 'No',
			}

			// Add per-preset variables if available
			if (preset.presets) {
				for (const num of [1, 2, 3] as const) {
					const p = preset.presets[num]
					if (p) {
						vars[`p${num}_brush`] = p.brushType
						vars[`p${num}_icon`] = brushTypeEmoji(p.brushType)
						vars[`p${num}_color`] = p.color
						vars[`p${num}_size`] = String(p.size)
					}
				}
			}

			this.setVariableValues(vars)

			// Check all feedbacks
			this.checkFeedbacks('activePreset', 'isZoomed', 'hasDrawing', 'activeColor', 'activeBrushInPreset', 'settingOn')
		} catch (e) {
			this.consecutiveFailures++

			// After 3 consecutive failures, try scanning for the iPad on other ports
			if (this.consecutiveFailures === 3) {
				this.log('info', 'Connection lost, scanning for iPad on alternative ports...')
				this.updateStatus(InstanceStatus.ConnectionFailure, 'Scanning for iPad...')
				const found = await this.scanForNewPort()
				if (found) {
					this.updateStatus(InstanceStatus.Ok, `Reconnected on port ${this.configuredPort}`)
					return
				}
			}

			this.updateStatus(InstanceStatus.ConnectionFailure)
			if (this.consecutiveFailures <= 3) {
				this.log('warn', `Poll failed: ${e}`)
			}
			// After 3, suppress log spam — only log every 10th failure
			else if (this.consecutiveFailures % 10 === 0) {
				this.log('warn', `Poll still failing (${this.consecutiveFailures} consecutive failures)`)
			}
		}
	}
}
