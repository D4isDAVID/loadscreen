fx_version 'cerulean'
game 'gta5'

version '2.0.0'
description 'Clean and fully configurable loading screen for FiveM'
author 'David Malchin <malchin459@gmail.com>'
repository 'https://github.com/D4isDAVID/loadscreen'

lua54 'yes'
use_experimental_fxv2_oal 'yes'

client_scripts {
    'client/shutdown.lua',
}

server_scripts {
    'server/handover.js',
}

files {
    'html/**',
}

loadscreen 'html/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'
