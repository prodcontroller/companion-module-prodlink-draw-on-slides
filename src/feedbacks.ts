import type { CompanionFeedbackDefinitions } from '@companion-module/base'
import { combineRgb } from '@companion-module/base'
import type { SlideDrawInstance } from './main'
import type { SettingsState } from './api'

export function getFeedbacks(instance: SlideDrawInstance): CompanionFeedbackDefinitions {
	return {
		activePreset: {
			type: 'boolean',
			name: 'Active Preset',
			description: 'Highlight when a specific preset is active',
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
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			callback: (feedback) => {
				const presetId = String(feedback.options['preset'])
				return instance.presetState?.activePreset === parseInt(presetId)
			},
		},

		isZoomed: {
			type: 'boolean',
			name: 'Is Zoomed',
			description: 'Active when canvas is zoomed in',
			options: [],
			defaultStyle: {
				bgcolor: combineRgb(0, 120, 200),
				color: combineRgb(255, 255, 255),
			},
			callback: () => {
				return instance.presetState?.isZoomed === true
			},
		},

		hasDrawing: {
			type: 'boolean',
			name: 'Has Drawing',
			description: 'Active when canvas has drawing content',
			options: [],
			defaultStyle: {
				bgcolor: combineRgb(180, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			callback: () => {
				return instance.presetState?.hasDrawing === true
			},
		},

		activeColor: {
			type: 'boolean',
			name: 'Active Color',
			description: 'Highlight when the specified color is the active drawing color',
			options: [
				{
					type: 'textinput',
					id: 'color',
					label: 'Color (hex)',
					default: '#FF0000',
				},
			],
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 255),
				color: combineRgb(0, 0, 0),
			},
			callback: (feedback) => {
				const targetColor = String(feedback.options['color']).toUpperCase()
				const currentColor = (instance.presetState?.color || '').toUpperCase()
				return currentColor === targetColor
			},
		},

		activeBrushInPreset: {
			type: 'boolean',
			name: 'Active Brush in Preset',
			description: 'Highlight when a preset uses a specific brush type',
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
					type: 'dropdown',
					id: 'brushType',
					label: 'Brush Type',
					default: 'pencil',
					choices: [
						{ id: 'pencil', label: 'Pencil' },
						{ id: 'marker', label: 'Marker' },
						{ id: 'watercolor', label: 'Watercolor' },
						{ id: 'pen', label: 'Pen' },
						{ id: 'monoline', label: 'Monoline' },
						{ id: 'fountainPen', label: 'Fountain Pen' },
						{ id: 'crayon', label: 'Crayon' },
					],
				},
			],
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			callback: (feedback) => {
				const presetNum = parseInt(String(feedback.options['preset'])) as 1 | 2 | 3
				const targetBrush = String(feedback.options['brushType'])
				const presetData = instance.presetState?.presets?.[presetNum]
				return presetData?.brushType === targetBrush
			},
		},

		settingOn: {
			type: 'boolean',
			name: 'Setting is ON',
			description: 'Highlight when a specific app setting is enabled',
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
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 0),
				color: combineRgb(255, 255, 255),
			},
			callback: (feedback) => {
				const settingKey = String(feedback.options['setting']) as keyof SettingsState
				if (!instance.settingsState) return false
				const value = instance.settingsState[settingKey]
				return value === true
			},
		},
	}
}
