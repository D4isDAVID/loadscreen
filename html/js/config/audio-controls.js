import {
    audioControls,
    audioMute,
    audioMuteIcon,
    audioVolume,
    backgroundAudio,
    backgroundVideo,
} from '../util/elements.js';
import { shouldShowAudioControls } from '../util/handover.js';

const VOLUME_KEY = 'audio_volume';

/** @type {boolean} */
let muted;
/** @type {string} */
let prevVolume;

export function setupAudioControls() {
    audioVolume.addEventListener('input', () => {
        if (backgroundAudio.paused && backgroundAudio.readyState)
            backgroundAudio.play();
        if (backgroundVideo.paused && backgroundVideo.readyState)
            backgroundVideo.play();

        const volume = parseFloat(audioVolume.value);

        backgroundVideo.volume = volume;
        backgroundAudio.volume = volume;
        localStorage.setItem(VOLUME_KEY, audioVolume.value);

        audioMuteIcon.src =
            volume === 0
                ? './assets/icons/no_sound.svg'
                : './assets/icons/volume_up.svg';

        if (volume > 0) muted = false;
    });

    audioMute.addEventListener('click', () => {
        if (!muted) prevVolume = audioVolume.value;
        if (prevVolume === '0') return;

        muted = !muted;
        audioVolume.value = muted ? '0' : prevVolume;
        audioVolume.dispatchEvent(new Event('input'));
    });
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configAudioControls(handoverData) {
    if (!shouldShowAudioControls(handoverData)) {
        audioControls.style.display = 'none';
        return;
    }

    const { config } = handoverData;
    const oldVolume = config.rememberVolume
        ? localStorage.getItem(VOLUME_KEY)
        : null;

    audioControls.style.display = '';
    audioVolume.value = oldVolume ?? `${config.initialAudioVolume}`;
    audioVolume.dispatchEvent(new Event('input'));
}
