---@param name string
---@param deferrals { handover: fun(obj: table<string, any>): nil }
AddEventHandler('playerConnecting', function(name, _, deferrals)
    deferrals.handover({
        playerName = name,
        serverName = GetConvar('sv_projectName', GetConvar('sv_hostname', '')),
    })
end)
