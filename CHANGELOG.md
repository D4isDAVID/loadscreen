# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

[unreleased diff]

## [2.1.2] - 2024-09-10

[2.1.2 diff]

### Changed

- Added a note to the example cfg file.
- The error log now also handles the `unhandledrejection` event.
- Removed some lines of code that don't do anything.
- Moved the audio controls to the bottom center to avoid conflicts with the `Loading game` prompt in different resolutions.
- Slightly increased the audio volume slider in width.
- Added some metadata to the HTML.
- Refactored the dev menu to be generated on runtime.

### Fixed

- Fix unhandled rejection when using audio controls but background music/video is off.

## [2.1.1] - 2024-08-29

[2.1.1 diff]

### Fixed

- Default GTA loading screen not shutting down with the NUI one.

## [2.1.0] - 2024-08-28

[2.1.0 diff]

### Added

- Convar to remember the audio volume set by the player using audio controls.
- Screen for when loading is done, but another resource has to shut the loading screen down.

### Changed

- When `externalShutdown` is off, the loading screen shuts down instantly after resources are done loading, instead of relying on spawnmanager.

### Fixed

- Finishing message not fading in/out.

## [2.0.0] - 2024-07-21

[2.0.0 diff]

### Added

- Automatic usage of assets (images, music, videos).
- Convar to toggle usage of music.
- Convar to switch between the available backgrounds (css, images, videos).
- Convars for shuffling music & videos.
- Convar for letting external resources handle the loadscreen shutdown.
- Shutdown when spawnmanager isn't available, and `externalShutdown` is false.
- Error log to easily see & copy errors when they happen in the NUI.
- Convars for toggling various parts of the loading screen on/off.
- Option for displaying a logo.
- Convars for changing the screen colors & CSS background.
- Convar option for setting a custom font family.
- Convar option for setting the background brightness.
- Dev menu when the screen is opened in regular browsers.
- Generated CFG output to the dev menu.
- GitHub pages deployment ([link](https://d4isdavid.github.io/loadscreen/)).
- Default background video.
- Background embed option.

### Changed

- Simplified music & video code.
- Reduced the loading bars' widths in the classic style.
- Moved the config from a JS file to FiveM convars.
- Rounded the loading bars' borders.
- Replaced the default audio controls with a cleaner version that also controls the background video's volume.
- Reduced padding from some sides of the screen in classic and modern styles for consistency.
- Disabled users being able to select text & drag images.
- Refactored the internal code.
  - Reformatted and typechecked the JS code.
  - Added GitHub workflows for testing the code and for publishing a GitHub release.
  - Added issue templates and a code of conduct for GitHub.
  - Reorganized the HTML.
  - Refactored some of the JS code.
  - Moved some type declarations into separate files.
  - Organized handovers.

### Removed

- Semantic versioning note in the changelog - this resource doesn't have an API.
- Config option for specifying assets - they are now automatically detected.
- Better shutdown for specific resources - use the new convar option.
- Minimal style hiding the secondary bar - this is now handled through convars.

## [1.2.0] - 2024-05-23

[1.2.0 diff]

### Added

- Config option for loadscreen styling.
- Modern style.
- Minimal style.
- README section for styles.

### Changed

- Made finishing transition faster.
- Made the loadscreen wrapper header disappear at the finishing transition.
- Slightly aligned the main loading bar with the default GTA V text in the classic style.
- Updated VSCode settings.
- Updated README preview video.

## [1.1.0] - 2023-12-02

[1.1.0 diff]

### Added

- Better shutdown for `qbx_core`.
- Preview in regular browsers.

### Changed

- Improved styling.
  - Used a lighter font for large texts.
  - Aligned the server message & audio controls at the top.
  - Added spacing between the mini progress bar & its action message.
- Updated README preview video.

### Fixed

- Invalid event data typing for `endDataFileEntries`.

## [1.0.1] - 2023-08-17

[1.0.1 diff]

### Fixed

- Finishing message not showing up.

## [1.0.0] - 2023-08-05

[1.0.0 commits]

### Added

- Main loading bar
- Secondary loading bar
- Optional background images
- Optional background music
- Optional background video
- Dynamic server message
- Finishing message
- Configuration file

[unreleased diff]: https://github.com/D4isDAVID/loadscreen/compare/v2.1.2...main
[2.1.2]: https://github.com/D4isDAVID/loadscreen/releases/tag/v2.1.2
[2.1.2 diff]: https://github.com/D4isDAVID/loadscreen/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/D4isDAVID/loadscreen/releases/tag/v2.1.1
[2.1.1 diff]: https://github.com/D4isDAVID/loadscreen/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/D4isDAVID/loadscreen/releases/tag/v2.1.0
[2.1.0 diff]: https://github.com/D4isDAVID/loadscreen/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/D4isDAVID/loadscreen/releases/tag/v2.0.0
[2.0.0 diff]: https://github.com/D4isDAVID/loadscreen/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/D4isDAVID/loadscreen/releases/tag/v1.2.0
[1.2.0 diff]: https://github.com/D4isDAVID/loadscreen/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/D4isDAVID/loadscreen/releases/tag/v1.1.0
[1.1.0 diff]: https://github.com/D4isDAVID/loadscreen/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/D4isDAVID/loadscreen/releases/tag/v1.0.1
[1.0.1 diff]: https://github.com/D4isDAVID/loadscreen/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/D4isDAVID/loadscreen/releases/tag/v1.0.0
[1.0.0 commits]: https://github.com/D4isDAVID/loadscreen/commits/v1.0.0
