const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const ASSETS = join(
    GetResourcePath(GetCurrentResourceName()),
    'html',
    'assets',
);

/**
 * @param {string} dir
 * @param {import("node:fs").ObjectEncodingOptions} options
 * @returns {string[]}
 */
function readAssetsSync(dir, options) {
    try {
        return readdirSync(join(ASSETS, dir), {
            ...options,
            withFileTypes: true,
        })
            .filter((f) => f.isFile())
            .map((f) => `./assets/${dir}/${f.name}`);
    } catch (e) {
        console.warn(/** @type {NodeJS.ErrnoException} */ (e).message);
        return [];
    }
}

/**
 * @param {string} name
 * @param {import("node:fs").ObjectEncodingOptions} options
 * @returns {string | undefined}
 */
function getFirstAssetWithNameSync(name, options) {
    try {
        return readdirSync(join(ASSETS), {
            ...options,
            withFileTypes: true,
        })
            .filter(
                (f) =>
                    f.isFile() &&
                    new RegExp(`^${name}\.[0-9A-Za-z]+$`).test(f.name),
            )
            .map((f) => `./assets/${f.name}`)[0];
    } catch (e) {
        console.warn(/** @type {NodeJS.ErrnoException} */ (e).message);
        return;
    }
}

const paths = {
    images: readAssetsSync('images', { encoding: 'utf8' }),
    music: readAssetsSync('music', { encoding: 'utf8' }),
    videos: readAssetsSync('videos', { encoding: 'utf8' }),
    logo: getFirstAssetWithNameSync('logo', { encoding: 'utf8' }),
};

/**
 * @typedef {Object} Deferrals
 * @property {(obj: Record<string, unknown>) => void} handover
 */

/**
 * @param {string} name
 * @param {(reason: string) => void} _setKickReason
 * @param {Deferrals} deferrals
 */
function onPlayerConnecting(name, _setKickReason, deferrals) {
    deferrals.handover({
        playerName: name,
        serverName: GetConvar('sv_projectName', GetConvar('sv_hostname', '')),

        paths,

        config: {
            style: GetConvar('loadscreen:style', 'classic'),

            logo: GetConvarInt('loadscreen:logo', 1) == 1,
            serverMessage: GetConvar(
                'loadscreen:serverMessage',
                '${playerName}, welcome to ${serverName}!',
            ),
            primaryBar: GetConvarInt('loadscreen:primaryBar', 1) == 1,
            secondaryBar: GetConvarInt('loadscreen:secondaryBar', 1) == 1,
            loadingAction: GetConvarInt('loadscreen:loadingAction', 1) == 1,
            finishingMessage: GetConvar(
                'loadscreen:finishingMessage',
                'Finishing up...',
            ),
            logLine: GetConvarInt('loadscreen:logLine', 1) == 1,
            audioControls: GetConvarInt('loadscreen:audioControls', 1) == 1,
            errorLog: GetConvarInt('loadscreen:errorLog', 1) == 1,

            initialAudioVolume:
                GetConvarInt('loadscreen:initialAudioVolume', 10) / 100,

            music: GetConvarInt('loadscreen:music', 1) == 1,
            musicShuffle: GetConvarInt('loadscreen:musicShuffle', 0) == 1,

            background: GetConvar('loadscreen:background', 'image'),
            imageRate: GetConvarInt('loadscreen:imageRate', 7500),
            imageShuffle: GetConvarInt('loadscreen:imageShuffle', 0) == 1,
            videoShuffle: GetConvarInt('loadscreen:videoShuffle', 0) == 1,
        },
    });
}

on('playerConnecting', onPlayerConnecting);
