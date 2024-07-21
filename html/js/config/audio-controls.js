import {
    audioControls,
    audioMute,
    audioMuteIcon,
    audioVolume,
    backgroundAudio,
    backgroundVideo,
} from '../util/elements.js';
import { shouldShowAudioControls } from '../util/handover.js';

/** @type {boolean} */
let muted;
/** @type {string} */
let prevVolume;

export function setupAudioControls() {
    audioVolume.addEventListener('input', () => {
        if (backgroundAudio.paused) backgroundAudio.play();
        if (backgroundVideo.paused) backgroundVideo.play();

        const volume = parseFloat(audioVolume.value);

        backgroundVideo.volume = volume;
        backgroundAudio.volume = volume;

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

    audioControls.style.display = '';
    audioVolume.value = `${config.initialAudioVolume}`;
    audioVolume.dispatchEvent(new Event('input'));
}
