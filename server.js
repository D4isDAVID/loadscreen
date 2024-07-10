const { readdirSync } = require("node:fs");
const { join } = require("node:path");

const ASSETS = join(
    GetResourcePath(GetCurrentResourceName()),
    "html",
    "assets"
);

/**
 * @param {string} dir
 * @param {import("node:fs").ObjectEncodingOptions & { recursive?: boolean | undefined }} options
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
        console.warn(e.message);
        return [];
    }
}

const paths = {
    images: readAssetsSync("images", { encoding: "utf8" }),
    music: readAssetsSync("music", { encoding: "utf8" }),
    videos: readAssetsSync("videos", { encoding: "utf8" }),
};

/**
 * @typedef {Object} Deferrals
 * @property {(obj: Record<string, unknown>) => void} handover
 */

/**
 * @param {string} name
 * @param {Deferrals} deferrals
 */
function onPlayerConnecting(name, _, deferrals) {
    deferrals.handover({
        playerName: name,
        serverName: GetConvar("sv_projectName", GetConvar("sv_hostname", "")),

        paths,

        config: {
            style: GetConvar("loadscreen:style", "classic"),
            backgroundColor: GetConvar("loadscreen:backgroundColor", "#4040ff"),
            showLogo: GetConvarInt("loadscreen:showLogo", 1) == 1,
            overlay: GetConvarInt("loadscreen:overlay", 1) == 1,

            serverMessage: GetConvar(
                "loadscreen:serverMessage",
                "${playerName}, welcome to ${serverName}!"
            ),
            finishingMessage: GetConvar(
                "loadscreen:finishingMessage",
                "Finishing up..."
            ),

            music: GetConvarInt("loadscreen:music", 1) == 1,
            musicVolume: GetConvarInt("loadscreen:musicVolume", 10) / 100,
            musicShuffle: GetConvarInt("loadscreen:musicShuffle", 0) == 1,

            background: GetConvar("loadscreen:background", "image"),

            imageRate: GetConvarInt("loadscreen:imageRate", 7500),
            imageShuffle: GetConvarInt("loadscreen:imageShuffle", 0) == 1,

            videoVolume: GetConvarInt("loadscreen:videoVolume", 10) / 100,
            videoShuffle: GetConvarInt("loadscreen:videoShuffle", 0) == 1,
        },
    });
}

on("playerConnecting", onPlayerConnecting);
