/**
 * HTTP API client for communicating with the Draw on Slides iPad app.
 */

export interface PresetConfig {
	brushType: string;
	color: string;
	size: number;
	opacity: number;
}

export interface PresetState {
	activePreset: number;
	brushType: string;
	color: string;
	size: number;
	opacity: number;
	isEraser: boolean;
	isZoomed: boolean;
	hasDrawing: boolean;
	presets?: {
		1: PresetConfig;
		2: PresetConfig;
		3: PresetConfig;
	};
}

export interface SlideState {
	currentSlideIndex: number;
	presentationName: string | null;
	presentationId: string | null;
	totalGroups: number;
}

export interface ConnectionState {
	status: string;
	ip: string;
	port: number;
	deviceName: string | null;
}

export interface SettingsState {
	clearOnSlideChange: boolean;
	autoReconnect: boolean;
	allowFingerDrawing: boolean;
	slideTriggerDelayEnabled: boolean;
	swipeNavigationEnabled: boolean;
	prevNextButtonsEnabled: boolean;
	thumbnailNavigationEnabled: boolean;
	showSlideLabels: boolean;
	resetZoomOnSlideChange: boolean;
	showTimer: boolean;
	timerCompactDisplay: boolean;
	overrideTimerEnabled: boolean;
	showStageMessages: boolean;
	ndiAlphaMode: string;
	outputWidth: number;
	outputHeight: number;
	smoothing: number;
}

// Consolidated state returned by GET /api/state (single call replaces 4)
export interface ConsolidatedState {
	preset: PresetState;
	slide: SlideState;
	connection: { status: string; ip: string };
	settings: SettingsState;
}

export class SlideDrawAPI {
	private baseUrl: string;

	constructor(ip: string, port: number) {
		this.baseUrl = `http://${ip}:${port}`;
	}

	updateConfig(ip: string, port: number): void {
		this.baseUrl = `http://${ip}:${port}`;
	}

	private async request<T>(method: string, path: string, body?: Record<string, unknown>): Promise<T> {
		const url = `${this.baseUrl}${path}`;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		try {
			const options: RequestInit = {
				method,
				headers: { 'Content-Type': 'application/json' },
				signal: controller.signal,
			};
			if (body) {
				options.body = JSON.stringify(body);
			}

			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			return response.json() as Promise<T>;
		} finally {
			clearTimeout(timeoutId);
		}
	}

	// GET endpoints
	async getState(): Promise<ConsolidatedState> {
		return this.request<ConsolidatedState>('GET', '/api/state');
	}

	async getPreset(): Promise<PresetState> {
		return this.request<PresetState>('GET', '/api/preset');
	}

	async getSlide(): Promise<SlideState> {
		return this.request<SlideState>('GET', '/api/slide');
	}

	async getConnection(): Promise<ConnectionState> {
		return this.request<ConnectionState>('GET', '/api/connection');
	}

	// POST endpoints
	async switchPreset(id: 1 | 2 | 3): Promise<void> {
		await this.request('POST', `/api/preset/${id}`);
	}

	async nextSlide(): Promise<void> {
		await this.request('POST', '/api/slide/next');
	}

	async previousSlide(): Promise<void> {
		await this.request('POST', '/api/slide/previous');
	}

	async clearCanvas(): Promise<void> {
		await this.request('POST', '/api/clear');
	}

	async undo(): Promise<void> {
		await this.request('POST', '/api/undo');
	}

	async zoomReset(): Promise<void> {
		await this.request('POST', '/api/zoom/reset');
	}

	async setColor(color: string): Promise<void> {
		await this.request('POST', '/api/tool/color', { color });
	}

	async setSize(size: number): Promise<void> {
		await this.request('POST', '/api/tool/size', { size });
	}

	async setOpacity(opacity: number): Promise<void> {
		await this.request('POST', '/api/tool/opacity', { opacity });
	}

	// PUT endpoints
	async updatePreset(id: 1 | 2 | 3, settings: {
		color?: string;
		brushType?: string;
		size?: number;
		opacity?: number;
	}): Promise<void> {
		await this.request('PUT', `/api/preset/${id}`, settings);
	}

	// Settings endpoints
	async getSettings(): Promise<SettingsState> {
		return this.request<SettingsState>('GET', '/api/settings');
	}

	async updateSettings(settings: Partial<SettingsState>): Promise<void> {
		await this.request('PUT', '/api/settings', settings as Record<string, unknown>);
	}

	// Connection test
	async testConnection(): Promise<boolean> {
		try {
			await this.getConnection();
			return true;
		} catch {
			return false;
		}
	}
}
