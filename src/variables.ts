import type { CompanionVariableDefinition } from '@companion-module/base'

// Map brush type to emoji for button display
export function brushTypeEmoji(brushType: string): string {
	switch (brushType) {
		case 'pencil': return '✏️'
		case 'marker': return '🖍️'
		case 'watercolor': return '🎨'
		case 'pen': return '🖊️'
		case 'monoline': return '✒️'
		case 'fountainPen': return '🪶'
		case 'crayon': return '🖍️'
		default: return '✏️'
	}
}

export function getVariables(): CompanionVariableDefinition[] {
	return [
		// Active tool info
		{ variableId: 'active_preset', name: 'Active Preset Number' },
		{ variableId: 'brush_type', name: 'Current Brush Type' },
		{ variableId: 'color', name: 'Current Drawing Color' },
		{ variableId: 'size', name: 'Current Brush Size' },
		{ variableId: 'opacity', name: 'Current Brush Opacity' },
		{ variableId: 'is_eraser', name: 'Eraser Active' },

		// Per-preset info
		{ variableId: 'p1_brush', name: 'Preset 1 Brush Type' },
		{ variableId: 'p1_icon', name: 'Preset 1 Icon' },
		{ variableId: 'p1_color', name: 'Preset 1 Color' },
		{ variableId: 'p1_size', name: 'Preset 1 Size' },
		{ variableId: 'p2_brush', name: 'Preset 2 Brush Type' },
		{ variableId: 'p2_icon', name: 'Preset 2 Icon' },
		{ variableId: 'p2_color', name: 'Preset 2 Color' },
		{ variableId: 'p2_size', name: 'Preset 2 Size' },
		{ variableId: 'p3_brush', name: 'Preset 3 Brush Type' },
		{ variableId: 'p3_icon', name: 'Preset 3 Icon' },
		{ variableId: 'p3_color', name: 'Preset 3 Color' },
		{ variableId: 'p3_size', name: 'Preset 3 Size' },

		// Slide & connection info
		{ variableId: 'slide_index', name: 'Current Slide Index' },
		{ variableId: 'presentation_name', name: 'Presentation Name' },
		{ variableId: 'connection_status', name: 'ProPresenter Connection Status' },
		{ variableId: 'propresenter_ip', name: 'ProPresenter IP Address' },

		// Settings (boolean toggles)
		{ variableId: 'clear_on_slide', name: 'Clear on Slide Change' },
		{ variableId: 'finger_drawing', name: 'Allow Finger Drawing' },
		{ variableId: 'swipe_nav', name: 'Swipe Navigation' },
		{ variableId: 'reset_zoom_slide', name: 'Reset Zoom on Slide' },
		{ variableId: 'show_timer', name: 'Show Timer' },
		{ variableId: 'show_stage_msgs', name: 'Show Stage Messages' },
		{ variableId: 'prev_next_btns', name: 'Prev/Next Buttons' },
		{ variableId: 'thumb_nav', name: 'Thumbnail Navigation' },
		{ variableId: 'show_labels', name: 'Show Slide Labels' },

		// Canvas state
		{ variableId: 'is_zoomed', name: 'Canvas Zoom State' },
		{ variableId: 'has_drawing', name: 'Canvas Has Drawing' },
	]
}
