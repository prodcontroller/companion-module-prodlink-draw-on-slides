# ProdLink: Draw on Slides — Companion Module

Control the **Draw on Slides** iPad app directly from Bitfocus Companion. Switch drawing presets, navigate slides, clear the canvas, adjust tools, and toggle settings — all with real-time visual feedback on your Companion buttons.

## Setup

1. Install the **Draw on Slides** app on your iPad
2. In the iPad app, go to **Settings → HTTP API** and enable the HTTP server
3. Note the **IP address** and **port** shown in the app
4. In Companion, add a **ProdLink: Draw on Slides** connection
5. Either select the iPad from the **Auto-Discover** dropdown, or choose **Manual** and enter the IP and port
6. Click **Save** — the module will connect and start polling for state updates

## Configuration

| Field | Description |
|---|---|
| **iPad (Auto-Discover)** | Automatically finds iPads running Draw on Slides on your network via Bonjour |
| **iPad IP Address** | Manual IP entry (shown when Auto-Discover is set to Manual) |
| **Port** | HTTP server port, default 8080 (shown when Auto-Discover is set to Manual) |
| **Poll Interval** | How often to check for state changes. Default 1500ms. Lower = faster feedback, higher = less iPad load. Minimum 500ms |

## Features

### Drawing Presets (1-3)
Switch between three drawing presets, each with their own brush type, color, size, and opacity. Buttons show which preset is active with color feedback.

### Tool Selection
- **Pen** — Standard drawing tool
- **Marker** — Semi-transparent marker
- **Pencil** — Textured pencil
- **Crayon** — Textured crayon
- **Eraser** — Erase strokes

### Slide Navigation
- **Next Slide / Previous Slide** — Navigate through ProPresenter slides (supports action cues/builds)
- **Clear Canvas** — Clear all drawings (shows active state when there's something to clear)
- **Undo** — Undo last stroke

### Zoom
- **Toggle Zoom** — Pinch-zoom the canvas (button shows active state when zoomed)
- **Reset Zoom** — Reset to default view

### Color Presets
Quick-select colors with visual feedback showing which color is active. Colors display as dim when inactive and bold when selected.

### Tool Adjustments
- **Size Presets** — Set brush size (5, 10, 15, 20, 25, 30, 35, 40)
- **Opacity Presets** — Set brush opacity (10% increments)

### Settings Toggles
Toggle app settings directly from Companion with ON/OFF visual feedback:
- Clear on Slide Change
- Allow Finger Drawing
- Swipe Navigation
- Reset Zoom on Slide Change
- Show Timer
- Show Stage Messages
- Previous/Next Buttons
- Thumbnail Navigation
- Show Slide Labels

## Auto-Reconnection

If the iPad app restarts or changes ports, the module will automatically:
1. Detect the connection loss after 3 failed polls
2. Scan ports 8080–8090 on the same IP to find the new port
3. Reconnect automatically — no manual intervention needed

## Variables

| Variable | Description |
|---|---|
| `active_preset` | Currently active preset (1-3) |
| `brush_type` | Current brush type |
| `color` | Current color hex |
| `size` | Current brush size |
| `opacity` | Current opacity |
| `is_eraser` | Whether eraser is active |
| `slide_index` | Current slide index |
| `presentation_name` | Current presentation name |
| `connection_status` | ProPresenter connection status |
| `is_zoomed` | Whether canvas is zoomed |
| `has_drawing` | Whether there's a drawing on canvas |
