import { backgroundEmbed } from '../util/elements.js';
import { shouldShowBackgroundEmbed } from '../util/handover.js';

/**
 * @param {NuiHandoverData} handoverData
 */
export function configBackgroundEmbed(handoverData) {
    if (!shouldShowBackgroundEmbed(handoverData)) {
        backgroundEmbed.src = '';
        return;
    }

    const { config } = handoverData;

    backgroundEmbed.src = config.embedLink;
    backgroundEmbed.style.pointerEvents = config.embedAccess ? 'all' : 'none';
}
