-- these resources can handle the loadscreen shutdown for us
local resources = {
    'qb-multicharacter',
    'qbx-multicharacter',
    'esx_multicharacter',
    'ox_core',
    'qbx_core',
}

for i = 1, #resources do
    if GetResourceState(resources[i]):find('start') then
        return
    end
end

-- sumneko lua gives a warning if I don't do this weird thing
local handler
handler = AddEventHandler('playerSpawned', function()
    ShutdownLoadingScreenNui()
    RemoveEventHandler(handler)
end)
