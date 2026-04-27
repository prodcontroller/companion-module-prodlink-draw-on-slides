import type { CompanionVariableDefinitions } from '@companion-module/base'

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

export function getVariables(): CompanionVariableDefinitions {
	return {
		// Active tool info
		active_preset: { name: 'Active Preset Number' },
		brush_type: { name: 'Current Brush Type' },
		color: { name: 'Current Drawing Color' },
		size: { name: 'Current Brush Size' },
		opacity: { name: 'Current Brush Opacity' },
		is_eraser: { name: 'Eraser Active' },

		// Per-preset info
		p1_brush: { name: 'Preset 1 Brush Type' },
		p1_icon: { name: 'Preset 1 Icon' },
		p1_color: { name: 'Preset 1 Color' },
		p1_size: { name: 'Preset 1 Size' },
		p2_brush: { name: 'Preset 2 Brush Type' },
		p2_icon: { name: 'Preset 2 Icon' },
		p2_color: { name: 'Preset 2 Color' },
		p2_size: { name: 'Preset 2 Size' },
		p3_brush: { name: 'Preset 3 Brush Type' },
		p3_icon: { name: 'Preset 3 Icon' },
		p3_color: { name: 'Preset 3 Color' },
		p3_size: { name: 'Preset 3 Size' },

		// Slide & connection info
		slide_index: { name: 'Current Slide Index' },
		presentation_name: { name: 'Presentation Name' },
		connection_status: { name: 'ProPresenter Connection Status' },
		propresenter_ip: { name: 'ProPresenter IP Address' },

		// Settings (boolean toggles)
		clear_on_slide: { name: 'Clear on Slide Change' },
		finger_drawing: { name: 'Allow Finger Drawing' },
		swipe_nav: { name: 'Swipe Navigation' },
		reset_zoom_slide: { name: 'Reset Zoom on Slide' },
		show_timer: { name: 'Show Timer' },
		show_stage_msgs: { name: 'Show Stage Messages' },
		prev_next_btns: { name: 'Prev/Next Buttons' },
		thumb_nav: { name: 'Thumbnail Navigation' },
		show_labels: { name: 'Show Slide Labels' },

		// Canvas state
		is_zoomed: { name: 'Canvas Zoom State' },
		has_drawing: { name: 'Canvas Has Drawing' },
	}
}
