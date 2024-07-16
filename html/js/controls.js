import {
    audioControls,
    audioMute,
    audioMuteIcon,
    audioVolume,
    backgroundAudio,
    backgroundVideo,
} from './util/elements.js';
import { getHandoverData } from './util/handover.js';

const {
    paths: { music, videos },
    config: { music: musicEnabled, background, initialAudioVolume },
} = getHandoverData();

if (
    (musicEnabled && music.length > 0) ||
    (background === 'video' && videos.length > 0)
) {
    audioControls.style.display = '';
    audioVolume.value = `${initialAudioVolume}`;
    let muted = initialAudioVolume === 0;
    let volume = initialAudioVolume;

    /**
     * @param {number} volume
     */
    const updateVolume = (volume) => {
        muted = volume === 0;
        backgroundVideo.volume = volume;
        backgroundAudio.volume = volume;
        audioMuteIcon.src = muted
            ? './assets/icons/no_sound.svg'
            : './assets/icons/volume_up.svg';
    };

    audioVolume.addEventListener('input', () => {
        volume = parseFloat(audioVolume.value);
        updateVolume(volume);
    });

    audioMute.addEventListener('click', () => {
        updateVolume(muted ? volume : 0);
        audioVolume.value = muted ? '0' : `${volume}`;
    });
}
