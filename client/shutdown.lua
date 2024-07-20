local externalShutdown = GetConvarInt('loadscreen:externalShutdown', 0) == 1
if externalShutdown then return end

if not GetResourceState('spawnmanager'):find('start') then
    ShutdownLoadingScreenNui()
    return
end

-- sumneko lua gives a warning if I don't do this weird thing
local handler
handler = AddEventHandler('playerSpawned', function()
    ShutdownLoadingScreenNui()
    RemoveEventHandler(handler)
end)
