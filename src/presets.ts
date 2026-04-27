import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { combineRgb } from '@companion-module/base'

export function getPresetSections(): CompanionPresetSection[] {
	return [
		{
			id: 'drawing-tools',
			name: 'Drawing Tools',
			definitions: ['preset1', 'preset2', 'preset3'],
		},
		{
			id: 'canvas-actions',
			name: 'Canvas Actions',
			definitions: ['clearCanvas', 'undo', 'zoomReset'],
		},
		{
			id: 'slide-navigation',
			name: 'Slide Navigation',
			definitions: ['nextSlide', 'previousSlide'],
		},
		{
			id: 'preset-1-brushes',
			name: 'Preset 1 Brushes',
			definitions: ['p1_brush_pencil', 'p1_brush_marker', 'p1_brush_watercolor', 'p1_brush_pen', 'p1_brush_monoline', 'p1_brush_fountainPen', 'p1_brush_crayon'],
		},
		{
			id: 'preset-2-brushes',
			name: 'Preset 2 Brushes',
			definitions: ['p2_brush_pencil', 'p2_brush_marker', 'p2_brush_watercolor', 'p2_brush_pen', 'p2_brush_monoline', 'p2_brush_fountainPen', 'p2_brush_crayon'],
		},
		{
			id: 'preset-3-brushes',
			name: 'Preset 3 Brushes',
			definitions: ['p3_brush_pencil', 'p3_brush_marker', 'p3_brush_watercolor', 'p3_brush_pen', 'p3_brush_monoline', 'p3_brush_fountainPen', 'p3_brush_crayon'],
		},
		{
			id: 'colors',
			name: 'Colors',
			definitions: [
				'colorWhite', 'colorRed', 'colorOrange', 'colorYellow', 'colorGreen',
				'colorCyan', 'colorBlue', 'colorPurple', 'colorPink', 'colorBlack',
			],
		},
		{
			id: 'brush-size',
			name: 'Brush Size',
			definitions: ['size5', 'size10', 'size15', 'size20', 'size25', 'size30', 'size35', 'size40', 'size50'],
		},
		{
			id: 'opacity',
			name: 'Opacity',
			definitions: ['opacity10', 'opacity20', 'opacity30', 'opacity40', 'opacity50', 'opacity60', 'opacity70', 'opacity80', 'opacity90', 'opacity100'],
		},
		{
			id: 'settings',
			name: 'Settings',
			definitions: [
				'toggleClear', 'toggleFinger', 'toggleSwipe', 'toggleZoomReset',
				'toggleTimer', 'toggleStageMsg', 'togglePrevNext', 'toggleThumbNav', 'toggleLabels',
			],
		},
	]
}

export function getPresets(): CompanionPresetDefinitions {
	const presets: CompanionPresetDefinitions = {
		// ========================================
		// Drawing Tool Presets (P1, P2, P3)
		// ========================================
		preset1: {
			type: 'simple',
			name: 'Preset 1',
			style: {
				text: 'P1 $(Draw_on_Slides:p1_icon)\\n$(Draw_on_Slides:p1_brush)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(30, 30, 30),
			},
			steps: [{ down: [{ actionId: 'switchPreset', options: { preset: '1' } }], up: [] }],
			feedbacks: [{
				feedbackId: 'activePreset',
				options: { preset: '1' },
				style: { bgcolor: combineRgb(0, 100, 200), color: combineRgb(255, 255, 255) },
			}],
		},
		preset2: {
			type: 'simple',
			name: 'Preset 2',
			style: {
				text: 'P2 $(Draw_on_Slides:p2_icon)\\n$(Draw_on_Slides:p2_brush)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(30, 30, 30),
			},
			steps: [{ down: [{ actionId: 'switchPreset', options: { preset: '2' } }], up: [] }],
			feedbacks: [{
				feedbackId: 'activePreset',
				options: { preset: '2' },
				style: { bgcolor: combineRgb(0, 100, 200), color: combineRgb(255, 255, 255) },
			}],
		},
		preset3: {
			type: 'simple',
			name: 'Preset 3',
			style: {
				text: 'P3 $(Draw_on_Slides:p3_icon)\\n$(Draw_on_Slides:p3_brush)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(30, 30, 30),
			},
			steps: [{ down: [{ actionId: 'switchPreset', options: { preset: '3' } }], up: [] }],
			feedbacks: [{
				feedbackId: 'activePreset',
				options: { preset: '3' },
				style: { bgcolor: combineRgb(0, 100, 200), color: combineRgb(255, 255, 255) },
			}],
		},

		// ========================================
		// Canvas Actions
		// ========================================
		clearCanvas: {
			type: 'simple',
			name: 'Clear Canvas',
			style: {
				text: 'Clear\\n🧹',
				size: '18',
				color: combineRgb(200, 200, 200),
				bgcolor: combineRgb(50, 30, 30), // Dim when nothing to clear
			},
			steps: [{ down: [{ actionId: 'clearCanvas', options: {} }], up: [] }],
			feedbacks: [{
				feedbackId: 'hasDrawing',
				options: {},
				style: { bgcolor: combineRgb(180, 0, 0), color: combineRgb(255, 255, 255) }, // Bold red when there's content
			}],
		},
		undo: {
			type: 'simple',
			name: 'Undo',
			style: {
				text: 'Undo\\n↩️',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(80, 80, 80),
			},
			steps: [{ down: [{ actionId: 'undo', options: {} }], up: [] }],
			feedbacks: [],
		},
		zoomReset: {
			type: 'simple',
			name: 'Reset Zoom',
			style: {
				text: 'Zoom\\nReset 🔍',
				size: '14',
				color: combineRgb(180, 180, 180),
				bgcolor: combineRgb(40, 40, 50), // Dim when not zoomed
			},
			steps: [{ down: [{ actionId: 'zoomReset', options: {} }], up: [] }],
			feedbacks: [{
				feedbackId: 'isZoomed',
				options: {},
				style: { bgcolor: combineRgb(0, 120, 200), color: combineRgb(255, 255, 255) }, // Blue when zoomed
			}],
		},

		// ========================================
		// Slide Navigation
		// ========================================
		nextSlide: {
			type: 'simple',
			name: 'Next Slide',
			style: {
				text: 'Next\\n▶',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 80, 0),
			},
			steps: [{ down: [{ actionId: 'nextSlide', options: {} }], up: [] }],
			feedbacks: [],
		},
		previousSlide: {
			type: 'simple',
			name: 'Previous Slide',
			style: {
				text: '◀\\nPrev',
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 80, 0),
			},
			steps: [{ down: [{ actionId: 'previousSlide', options: {} }], up: [] }],
			feedbacks: [],
		},
	}

	// ========================================
	// Brush Type Selectors (per preset)
	// ========================================
	const brushTypes: Array<{ id: string; name: string; emoji: string }> = [
		{ id: 'pencil', name: 'Pencil', emoji: '✏️' },
		{ id: 'marker', name: 'Marker', emoji: '🖍️' },
		{ id: 'watercolor', name: 'Water', emoji: '🎨' },
		{ id: 'pen', name: 'Pen', emoji: '🖊️' },
		{ id: 'monoline', name: 'Mono', emoji: '✒️' },
		{ id: 'fountainPen', name: 'Fount', emoji: '🪶' },
		{ id: 'crayon', name: 'Crayon', emoji: '🖍️' },
	]

	for (let pNum = 1; pNum <= 3; pNum++) {
		for (const brush of brushTypes) {
			presets[`p${pNum}_brush_${brush.id}`] = {
				type: 'simple',
				name: `P${pNum} ${brush.name}`,
				style: {
					text: `${brush.emoji}\\n${brush.name}`,
					size: '14',
					color: combineRgb(180, 180, 180),
					bgcolor: combineRgb(30, 30, 30), // Dim when not active
				},
				steps: [{ down: [{ actionId: 'updatePreset', options: { preset: String(pNum), brushType: brush.id, color: '', size: 0, opacity: 0 } }], up: [] }],
				feedbacks: [{
					feedbackId: 'activeBrushInPreset',
					options: { preset: String(pNum), brushType: brush.id },
					style: { bgcolor: combineRgb(0, 100, 200), color: combineRgb(255, 255, 255) }, // Blue when active
				}],
			}
		}
	}

	// ========================================
	// Color Presets (dull default, bold when active)
	// ========================================
	const colors: Array<{ id: string; name: string; hex: string; r: number; g: number; b: number; dr: number; dg: number; db: number }> = [
		{ id: 'colorWhite',  name: 'White',  hex: '#FFFFFF', r: 255, g: 255, b: 255, dr: 100, dg: 100, db: 100 },
		{ id: 'colorRed',    name: 'Red',    hex: '#FF0000', r: 255, g: 0,   b: 0,   dr: 100, dg: 0,   db: 0 },
		{ id: 'colorOrange', name: 'Orange', hex: '#FF8C00', r: 255, g: 140, b: 0,   dr: 100, dg: 55,  db: 0 },
		{ id: 'colorYellow', name: 'Yellow', hex: '#FFD700', r: 255, g: 215, b: 0,   dr: 100, dg: 85,  db: 0 },
		{ id: 'colorGreen',  name: 'Green',  hex: '#00C853', r: 0,   g: 200, b: 83,  dr: 0,   dg: 80,  db: 33 },
		{ id: 'colorCyan',   name: 'Cyan',   hex: '#00BCD4', r: 0,   g: 188, b: 212, dr: 0,   dg: 75,  db: 85 },
		{ id: 'colorBlue',   name: 'Blue',   hex: '#2196F3', r: 33,  g: 150, b: 243, dr: 13,  dg: 60,  db: 97 },
		{ id: 'colorPurple', name: 'Purple', hex: '#9C27B0', r: 156, g: 39,  b: 176, dr: 62,  dg: 16,  db: 70 },
		{ id: 'colorPink',   name: 'Pink',   hex: '#E91E63', r: 233, g: 30,  b: 99,  dr: 93,  dg: 12,  db: 40 },
		{ id: 'colorBlack',  name: 'Black',  hex: '#000000', r: 0,   g: 0,   b: 0,   dr: 30,  dg: 30,  db: 30 },
	]

	for (const color of colors) {
		presets[color.id] = {
			type: 'simple',
			name: color.name,
			style: {
				text: color.name,
				size: '14',
				// Dull color when not active
				color: combineRgb(180, 180, 180),
				bgcolor: combineRgb(color.dr, color.dg, color.db),
			},
			steps: [{ down: [{ actionId: 'setColor', options: { color: color.hex } }], up: [] }],
			feedbacks: [{
				feedbackId: 'activeColor',
				options: { color: color.hex },
				// Bold vibrant color when active
				style: {
					bgcolor: combineRgb(color.r, color.g, color.b),
					color: (color.hex === '#000000' || color.hex === '#9C27B0') ? combineRgb(255, 255, 255) : combineRgb(0, 0, 0),
				},
			}],
		}
	}

	// ========================================
	// Size Presets (by 5s)
	// ========================================
	const sizes = [5, 10, 15, 20, 25, 30, 35, 40, 50]

	for (const size of sizes) {
		presets[`size${size}`] = {
			type: 'simple',
			name: `Size ${size}`,
			style: {
				text: `Size\\n${size}`,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(50, 50, 50),
			},
			steps: [{ down: [{ actionId: 'setSize', options: { size } }], up: [] }],
			feedbacks: [],
		}
	}

	// ========================================
	// Opacity Presets (by 10%)
	// ========================================
	for (let pct = 10; pct <= 100; pct += 10) {
		const opacity = pct / 100
		const brightness = Math.round(pct * 1.8)
		presets[`opacity${pct}`] = {
			type: 'simple',
			name: `${pct}% Opacity`,
			style: {
				text: `Opacity\\n${pct}%`,
				size: '14',
				color: pct >= 60 ? combineRgb(0, 0, 0) : combineRgb(255, 255, 255),
				bgcolor: combineRgb(brightness, brightness, brightness),
			},
			steps: [{ down: [{ actionId: 'setOpacity', options: { opacity } }], up: [] }],
			feedbacks: [],
		}
	}

	// ========================================
	// Settings Toggles (with ON/OFF visual feedback)
	// ========================================
	const settingToggles: Array<{ id: string; key: string; label: string; varId: string }> = [
		{ id: 'toggleClear', key: 'clearOnSlideChange', label: 'Clear\\non Slide', varId: 'clear_on_slide' },
		{ id: 'toggleFinger', key: 'allowFingerDrawing', label: 'Finger\\nDrawing', varId: 'finger_drawing' },
		{ id: 'toggleSwipe', key: 'swipeNavigationEnabled', label: 'Swipe\\nNav', varId: 'swipe_nav' },
		{ id: 'toggleZoomReset', key: 'resetZoomOnSlideChange', label: 'Reset Zoom\\non Slide', varId: 'reset_zoom_slide' },
		{ id: 'toggleTimer', key: 'showTimer', label: 'Show\\nTimer', varId: 'show_timer' },
		{ id: 'toggleStageMsg', key: 'showStageMessages', label: 'Stage\\nMessages', varId: 'show_stage_msgs' },
		{ id: 'togglePrevNext', key: 'prevNextButtonsEnabled', label: 'Prev/Next\\nButtons', varId: 'prev_next_btns' },
		{ id: 'toggleThumbNav', key: 'thumbnailNavigationEnabled', label: 'Thumb\\nNav', varId: 'thumb_nav' },
		{ id: 'toggleLabels', key: 'showSlideLabels', label: 'Slide\\nLabels', varId: 'show_labels' },
	]

	for (const toggle of settingToggles) {
		presets[toggle.id] = {
			type: 'simple',
			name: toggle.label.replace('\\n', ' '),
			style: {
				text: `${toggle.label}\\n$(Draw_on_Slides:${toggle.varId})`,
				size: '14',
				color: combineRgb(180, 180, 180),
				bgcolor: combineRgb(30, 30, 40), // Dim when OFF
			},
			steps: [{ down: [{ actionId: 'toggleSetting', options: { setting: toggle.key } }], up: [] }],
			feedbacks: [{
				feedbackId: 'settingOn',
				options: { setting: toggle.key },
				style: { bgcolor: combineRgb(0, 130, 0), color: combineRgb(255, 255, 255) }, // Green when ON
			}],
		}
	}

	return presets
}
