# loadscreen

Clean and fully configurable loading screen for FiveM ([preview]).

Need support? Check out the [Discord server](https://discord.gg/rdjpS2K8hC)!

- [Key Features](#key-features)
- [Configuration](#configuration)

## Key Features

### Multiple Loading Bars

The loading screen features a main loading bar representing the % of total
loading done, and a secondary loading bar representing the % of the current
step done. The secondary loading bar is disabled by default.

### Background Media

The loading screen features optional configurable background images, music,
and video.

### No Bridge

The loading screen shows up until the character spawns or until another
resource shuts it down, depending on the configuration.

### Multiple Styles

The loading screen comes with 3 styles by default:

- Classic: the style provided since v1.0.0;
- Modern: a modernized layout;
- Minimal: everything is condensed and centered (default).

The config can switch between these 3. Alternatively, you may create your own
CSS style and use it in the config instead.

### Fully Configurable

This loading screen offers a huge amount of options to enable you to configure
it for your server to a T.

## Configuration

Configuration is handled through [convars].
See [`loadscreen.cfg`](./loadscreen.cfg) for examples & explanations.

[preview]: https://d4isdavid.github.io/loadscreen/
[convars]: https://docs.fivem.net/docs/scripting-reference/convars/
