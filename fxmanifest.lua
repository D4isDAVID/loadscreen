fx_version 'cerulean'
game 'gta5'

version '1.3.0-dev'
description 'Loading screen for FiveM'
author 'David Malchin <malchin459@gmail.com>'
repository 'https://github.com/D4isDAVID/loadscreen'

lua54 'yes'
use_experimental_fxv2_oal 'yes'

client_scripts {
    'client.lua',
}

server_scripts {
    'server.lua',
}

files {
    'html/**',
}

loadscreen 'html/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'
