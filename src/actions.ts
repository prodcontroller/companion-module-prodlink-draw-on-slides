import type { CompanionActionDefinitions } from '@companion-module/base'

// Use 'any' for the instance type to avoid circular dependency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getActions(instance: any): CompanionActionDefinitions {
	return {
		clearCanvas: {
			name: 'Clear Canvas',
			description: 'Clear all drawings from the canvas',
			options: [],
			callback: async () => {
				try {
					await instance.api.clearCanvas()
					instance.log('info', 'Canvas cleared')
				} catch (e) {
					instance.log('warn', `Clear canvas failed: ${e}`)
				}
			},
		},

		undo: {
			name: 'Undo',
			description: 'Undo the last drawing stroke',
			options: [],
			callback: async () => {
				try {
					await instance.api.undo()
					instance.log('info', 'Undo triggered')
				} catch (e) {
					instance.log('warn', `Undo failed: ${e}`)
				}
			},
		},

		zoomReset: {
			name: 'Reset Zoom',
			description: 'Reset canvas zoom to default (1x)',
			options: [],
			callback: async () => {
				try {
					await instance.api.zoomReset()
					instance.log('info', 'Zoom reset')
				} catch (e) {
					instance.log('warn', `Zoom reset failed: ${e}`)
				}
			},
		},

		switchPreset: {
			name: 'Switch Preset',
			description: 'Switch to a drawing preset (1, 2, or 3)',
			options: [
				{
					type: 'dropdown',
					id: 'preset',
					label: 'Preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
					],
				},
			],
			callback: async (action) => {
				try {
					const presetId = parseInt(String(action.options.preset)) as 1 | 2 | 3
					await instance.api.switchPreset(presetId)
					instance.log('info', `Switched to preset ${presetId}`)
				} catch (e) {
					instance.log('warn', `Switch preset failed: ${e}`)
				}
			},
		},

		nextSlide: {
			name: 'Next Slide',
			description: 'Advance to the next slide',
			options: [],
			callback: async () => {
				try {
					await instance.api.nextSlide()
					instance.log('info', 'Triggered next slide')
				} catch (e) {
					instance.log('warn', `Next slide failed: ${e}`)
				}
			},
		},

		previousSlide: {
			name: 'Previous Slide',
			description: 'Go back to the previous slide',
			options: [],
			callback: async () => {
				try {
					await instance.api.previousSlide()
					instance.log('info', 'Triggered previous slide')
				} catch (e) {
					instance.log('warn', `Previous slide failed: ${e}`)
				}
			},
		},

		setColor: {
			name: 'Set Color',
			description: 'Set the active drawing color',
			options: [
				{
					type: 'textinput',
					id: 'color',
					label: 'Color (hex, e.g. #FF0000)',
					default: '#FF0000',
					required: true,
				},
			],
			callback: async (action) => {
				try {
					const color = String(action.options.color).trim()
					await instance.api.setColor(color)
					instance.log('info', `Color set to ${color}`)
				} catch (e) {
					instance.log('warn', `Set color failed: ${e}`)
				}
			},
		},

		setSize: {
			name: 'Set Brush Size',
			description: 'Set the active brush size (1-100)',
			options: [
				{
					type: 'number',
					id: 'size',
					label: 'Size',
					default: 20,
					min: 1,
					max: 100,
					required: true,
				},
			],
			callback: async (action) => {
				try {
					const size = Number(action.options.size)
					await instance.api.setSize(size)
					instance.log('info', `Size set to ${size}`)
				} catch (e) {
					instance.log('warn', `Set size failed: ${e}`)
				}
			},
		},

		setOpacity: {
			name: 'Set Opacity',
			description: 'Set the active brush opacity (0.1-1.0)',
			options: [
				{
					type: 'number',
					id: 'opacity',
					label: 'Opacity',
					default: 1,
					min: 0.1,
					max: 1,
					step: 0.1,
					required: true,
				},
			],
			callback: async (action) => {
				try {
					const opacity = Number(action.options.opacity)
					await instance.api.setOpacity(opacity)
					instance.log('info', `Opacity set to ${opacity}`)
				} catch (e) {
					instance.log('warn', `Set opacity failed: ${e}`)
				}
			},
		},

		updatePreset: {
			name: 'Update Preset Settings',
			description: 'Change a preset\'s color, brush type, size, or opacity',
			options: [
				{
					type: 'dropdown',
					id: 'preset',
					label: 'Preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
					],
				},
				{
					type: 'textinput',
					id: 'color',
					label: 'Color (hex, e.g. #FF0000)',
					default: '',
				},
				{
					type: 'dropdown',
					id: 'brushType',
					label: 'Brush Type',
					default: '',
					choices: [
						{ id: '', label: '(No change)' },
						{ id: 'pencil', label: 'Pencil' },
						{ id: 'marker', label: 'Marker' },
						{ id: 'watercolor', label: 'Watercolor' },
						{ id: 'pen', label: 'Pen' },
						{ id: 'monoline', label: 'Monoline' },
						{ id: 'fountainPen', label: 'Fountain Pen' },
						{ id: 'crayon', label: 'Crayon' },
					],
				},
				{
					type: 'number',
					id: 'size',
					label: 'Size (0 = no change)',
					default: 0,
					min: 0,
					max: 100,
				},
				{
					type: 'number',
					id: 'opacity',
					label: 'Opacity (0 = no change, 0.1-1.0)',
					default: 0,
					min: 0,
					max: 1,
					step: 0.1,
				},
			],
			callback: async (action) => {
				try {
					const presetId = parseInt(String(action.options.preset)) as 1 | 2 | 3
					const settings: Record<string, unknown> = {}

					if (action.options.color && String(action.options.color).trim()) {
						settings.color = String(action.options.color).trim()
					}
					if (action.options.brushType && String(action.options.brushType).trim()) {
						settings.brushType = String(action.options.brushType)
					}
					if (typeof action.options.size === 'number' && action.options.size > 0) {
						settings.size = action.options.size
					}
					if (typeof action.options.opacity === 'number' && action.options.opacity > 0) {
						settings.opacity = action.options.opacity
					}

					if (Object.keys(settings).length === 0) {
						instance.log('warn', 'Update preset called with no changes')
						return
					}

					await instance.api.updatePreset(presetId, settings)
					instance.log('info', `Updated preset ${presetId}: ${JSON.stringify(settings)}`)
				} catch (e) {
					instance.log('warn', `Update preset failed: ${e}`)
				}
			},
		},

		toggleSetting: {
			name: 'Toggle Setting',
			description: 'Toggle an app setting on or off',
			options: [
				{
					type: 'dropdown',
					id: 'setting',
					label: 'Setting',
					default: 'clearOnSlideChange',
					choices: [
						{ id: 'clearOnSlideChange', label: 'Clear on Slide Change' },
						{ id: 'allowFingerDrawing', label: 'Allow Finger Drawing' },
						{ id: 'swipeNavigationEnabled', label: 'Swipe Navigation' },
						{ id: 'prevNextButtonsEnabled', label: 'Prev/Next Buttons' },
						{ id: 'thumbnailNavigationEnabled', label: 'Thumbnail Navigation' },
						{ id: 'showSlideLabels', label: 'Show Slide Labels' },
						{ id: 'resetZoomOnSlideChange', label: 'Reset Zoom on Slide Change' },
						{ id: 'showTimer', label: 'Show Timer' },
						{ id: 'showStageMessages', label: 'Show Stage Messages' },
						{ id: 'timerCompactDisplay', label: 'Timer Compact Display' },
						{ id: 'overrideTimerEnabled', label: 'Override Timer' },
						{ id: 'autoReconnect', label: 'Auto Reconnect' },
						{ id: 'slideTriggerDelayEnabled', label: 'Slide Trigger Delay' },
					],
				},
			],
			callback: async (action) => {
				try {
					const settingKey = String(action.options.setting)
					// Get current value and toggle it
					const settings = await instance.api.getSettings()
					const currentValue = (settings as any)[settingKey]
					if (typeof currentValue !== 'boolean') {
						instance.log('warn', `Setting ${settingKey} is not a boolean toggle`)
						return
					}
					await instance.api.updateSettings({ [settingKey]: !currentValue })
					instance.log('info', `Toggled ${settingKey}: ${currentValue} → ${!currentValue}`)
				} catch (e) {
					instance.log('warn', `Toggle setting failed: ${e}`)
				}
			},
		},
	}
}
