import {
	BackwardOutlined,
	ForwardOutlined,
	LoadingOutlined,
	PauseOutlined,
	PlayCircleOutlined,
	SoundOutlined,
} from '@ant-design/icons';
import { Button, Slider, Space, Tooltip, theme } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IAudioPlayerProps {
	/** Audio source URL */
	src?: string;
	/** Seek offset in seconds for backward/forward buttons (default: 10) */
	seekOffset?: number;
	/** Component size: 'small' | 'middle' | 'large' */
	size?: SizeType;
	/** Auto-play as soon as audio is ready (requires prior user gesture to bypass autoplay policy) */
	autoPlay?: boolean;
	/** Called with a play() trigger function once the audio element is ready */
	onReady?: (play: () => void) => void;

	// ── Block visibility ─────────────────────────────────────────────────────
	/** Hide the entire audio controls block (seek back + play + seek forward) */
	hideControls?: boolean;
	/** Hide the entire timeline block (current time + progress slider + duration) */
	hideTimeline?: boolean;
	/** Hide the entire volume block (mute button + volume slider) */
	hideVolume?: boolean;

	// ── Fine-grained visibility ───────────────────────────────────────────────
	/** Hide the seek backward button */
	hideSeekBackward?: boolean;
	/** Hide the seek forward button */
	hideSeekForward?: boolean;
	/** Hide the time labels (current time / duration), keeping the slider */
	hideTimeDisplay?: boolean;
	/** Hide only the volume slider (keep the mute button) */
	hideVolumeSlider?: boolean;

	// ── Disable states ────────────────────────────────────────────────────────
	/** Disable all controls */
	disabled?: boolean;
	/** Disable only the seek buttons (backward/forward) */
	disableSeek?: boolean;
	/** Disable dragging the timeline progress slider (slider still shows position) */
	disableTimeSeeking?: boolean;
	/** Disable volume controls */
	disableVolumeControl?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatTime = (seconds: number): string => {
	if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, '0')}`;
};

// ─── Component ────────────────────────────────────────────────────────────────

export const AudioPlayer = ({
	src,
	seekOffset = 10,
	size = 'middle',
	autoPlay = false,
	onReady,
	hideControls = false,
	hideTimeline = false,
	hideVolume = false,
	hideSeekBackward = false,
	hideSeekForward = false,
	hideTimeDisplay = false,
	hideVolumeSlider = false,
	disabled = false,
	disableSeek = false,
	disableTimeSeeking = false,
	disableVolumeControl = false,
}: IAudioPlayerProps) => {
	const { token } = theme.useToken();
	const audioRef = useRef<HTMLAudioElement>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isSeeking, setIsSeeking] = useState(false);

	// ── Audio event handlers ──────────────────────────────────────────────────

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const onPlay = () => setIsPlaying(true);
		const onPause = () => setIsPlaying(false);
		const onEnded = () => setIsPlaying(false);
		const onLoadStart = () => setIsLoading(true);
		const onCanPlay = () => setIsLoading(false);
		const onDurationChange = () => {
			if (audio.duration && isFinite(audio.duration)) {
				setDuration(audio.duration);
			}
		};
		const onTimeUpdate = () => {
			if (!isSeeking) setCurrentTime(audio.currentTime);
		};
		const onVolumeChange = () => {
			setVolume(audio.volume);
			setIsMuted(audio.muted);
		};

		// Read duration immediately — metadata may already be loaded
		onDurationChange();

		// Expose play() so parent (e.g. modal) can trigger after user gesture
		if (onReady) onReady(() => audio.play());

		audio.addEventListener('play', onPlay);
		audio.addEventListener('pause', onPause);
		audio.addEventListener('ended', onEnded);
		audio.addEventListener('loadstart', onLoadStart);
		audio.addEventListener('canplay', onCanPlay);
		audio.addEventListener('loadedmetadata', onDurationChange);
		audio.addEventListener('durationchange', onDurationChange);
		audio.addEventListener('timeupdate', onTimeUpdate);
		audio.addEventListener('volumechange', onVolumeChange);

		return () => {
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('pause', onPause);
			audio.removeEventListener('ended', onEnded);
			audio.removeEventListener('loadstart', onLoadStart);
			audio.removeEventListener('canplay', onCanPlay);
			audio.removeEventListener('loadedmetadata', onDurationChange);
			audio.removeEventListener('durationchange', onDurationChange);
			audio.removeEventListener('timeupdate', onTimeUpdate);
			audio.removeEventListener('volumechange', onVolumeChange);
		};
	}, [isSeeking, onReady]);

	// ── Controls ─────────────────────────────────────────────────────────────

	const handlePlayPause = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
	}, [isPlaying]);

	const handleSeek = useCallback((offset: number) => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + offset));
	}, []);

	const handleSliderChange = useCallback((value: number) => {
		setIsSeeking(true);
		setCurrentTime(value);
	}, []);

	const handleSliderAfterChange = useCallback((value: number) => {
		const audio = audioRef.current;
		if (audio) audio.currentTime = value;
		setIsSeeking(false);
	}, []);

	const handleToggleMute = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.muted = !audio.muted;
	}, []);

	const handleVolumeChange = useCallback((value: number) => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.volume = value / 100;
		if (audio.muted && value > 0) audio.muted = false;
	}, []);

	// ── Derived ───────────────────────────────────────────────────────────────

	const isDisabled = disabled || !src;
	const isSeekDisabled = isDisabled || disableSeek;
	const isTimeSeekingDisabled = isDisabled || disableTimeSeeking;
	const isVolumeDisabled = isDisabled || disableVolumeControl;

	const timeTextStyle: React.CSSProperties = {
		cursor: 'default',
		fontVariantNumeric: 'tabular-nums',
		fontSize: token.fontSizeSM,
		color: isDisabled ? token.colorTextDisabled : token.colorTextSecondary,
		minWidth: 36,
		textAlign: 'center',
	};

	const sliderButtonStyle: React.CSSProperties = {
		cursor: 'default',
		padding: `0 ${token.paddingXS}px`,
	};

	return (
		<>
			{/* Hidden audio element */}
			<audio ref={audioRef} src={src} preload='metadata' autoPlay={autoPlay} />

			{/* ── Single Space.Compact wrapping all elements ───────────────── */}
			<Space.Compact size={size}>
				{/* Block 1: Audio Controls — seek back + play/pause + seek forward */}
				{!hideControls && (
					<>
						{!hideSeekBackward && (
							<Tooltip title={`Tua lùi ${seekOffset}s`}>
								<Button
									size={size}
									icon={<BackwardOutlined />}
									disabled={isSeekDisabled}
									onClick={() => handleSeek(-seekOffset)}
									aria-label={`Tua lùi ${seekOffset} giây`}
								/>
							</Tooltip>
						)}

						<Tooltip title={isPlaying ? 'Tạm dừng' : 'Phát'}>
							<Button
								size={size}
								icon={isLoading ? <LoadingOutlined /> : isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
								disabled={isDisabled}
								onClick={handlePlayPause}
								aria-label={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
							/>
						</Tooltip>

						{!hideSeekForward && (
							<Tooltip title={`Tua tới ${seekOffset}s`}>
								<Button
									size={size}
									icon={<ForwardOutlined />}
									disabled={isSeekDisabled}
									onClick={() => handleSeek(seekOffset)}
									aria-label={`Tua tới ${seekOffset} giây`}
								/>
							</Tooltip>
						)}
					</>
				)}

				{/* Block 2: Timeline — current time + slider + duration */}
				{!hideTimeline && (
					<>
						{(() => {
							const timelineTooltip = isDisabled
								? ''
								: isLoading
									? 'Đang tải...'
									: isPlaying
										? 'Đang phát'
										: currentTime > 0 && currentTime >= duration
											? 'Đã kết thúc'
											: 'Đã dừng';

							return (
								<>
									{!hideTimeDisplay && (
										<Tooltip title={timelineTooltip}>
											<Button size={size} style={timeTextStyle}>
												{formatTime(currentTime)}
											</Button>
										</Tooltip>
									)}

									<Tooltip title={timelineTooltip}>
										<Button
											size={size}
											style={{ ...sliderButtonStyle, minWidth: 80 }}
											disabled={isDisabled}
											onClick={(e) => e.preventDefault()}
										>
											<Slider
												min={0}
												max={duration || 100}
												value={currentTime}
												step={0.1}
												tooltip={{ formatter: (v) => formatTime(v ?? 0) }}
												disabled={isTimeSeekingDisabled}
												onChange={isTimeSeekingDisabled ? undefined : handleSliderChange}
												onChangeComplete={isTimeSeekingDisabled ? undefined : handleSliderAfterChange}
												style={{ width: '100%', cursor: isTimeSeekingDisabled ? 'not-allowed' : undefined }}
											/>
										</Button>
									</Tooltip>

									{!hideTimeDisplay && (
										<Tooltip title={timelineTooltip}>
											<Button size={size} style={timeTextStyle}>
												{formatTime(duration)}
											</Button>
										</Tooltip>
									)}
								</>
							);
						})()}
					</>
				)}

				{/* Block 3: Volume — mute toggle + volume slider */}
				{!hideVolume && (
					<>
						<Tooltip title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}>
							<Button
								size={size}
								icon={<SoundOutlined />}
								disabled={isVolumeDisabled}
								onClick={handleToggleMute}
								aria-label={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
							/>
						</Tooltip>

						{!hideVolumeSlider && (
							<Button
								size={size}
								style={{ ...sliderButtonStyle, width: 80 }}
								disabled={isVolumeDisabled}
								onClick={(e) => e.preventDefault()}
							>
								<Slider
									min={0}
									max={100}
									value={isMuted ? 0 : Math.round(volume * 100)}
									tooltip={{ formatter: (v) => `${v}%` }}
									disabled={isVolumeDisabled}
									onChange={handleVolumeChange}
									style={{ width: '100%' }}
								/>
							</Button>
						)}
					</>
				)}
			</Space.Compact>
		</>
	);
};
