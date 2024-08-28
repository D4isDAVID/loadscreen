local externalShutdown = GetConvarInt('loadscreen:externalShutdown', 0) == 1

CreateThread(function()
    if not externalShutdown then
        ShutdownLoadingScreenNui()
        return
    end

    SendLoadingScreenMessage(json.encode({
        customEvent = 'finishedLoading',
    }))
end)
