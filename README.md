# loadscreen

A simple loading screen for FiveM ([preview]).

- [Key Features](#key-features)
- [Configuration](#configuration)

## Key Features

### Multiple Loading Bars

The loading screen features a main loading bar representing the % of total
loading done, and a secondary loading bar representing the % of the current
step done.

### Background Media

The loading screen features optional configurable background images, music,
and video.

### No Bridge

The loading screen shows up until the character spawns (or until a supported
multicharacter script loads).

### Multiple Styles

The loading screen comes with 3 styles by default:

- Classic: the default style since v1.0.0;
- Modern: a modernized layout;
- Minimal: everything is centered and the secondary loading bar is removed.

The config can switch between these 3. Alternatively, you may create your own
CSS style and use it in the config instead.

## Configuration

Configuration is handled through [convars].
See [`loadscreen.cfg`](./loadscreen.cfg) for examples & explanations.

[preview]: https://www.youtube.com/watch?v=PYmLLWKTgWo
[convars]: https://docs.fivem.net/docs/scripting-reference/convars/
