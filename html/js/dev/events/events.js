export const events =
    /** @type {import("../event-handlers.js").DevEvent[]} */ ([
        {
            name: 'loadProgress',
            params: [
                {
                    name: 'loadFraction',
                    type: 'range',
                    value: '0',
                    min: '0',
                    max: '1',
                    step: '0.01',
                },
            ],
        },
        {
            name: 'onLogLine',
            params: [
                {
                    name: 'message',
                    type: 'text',
                    value: 'Awaiting scripts...',
                },
            ],
        },
        {
            name: 'startDataFileEntries',
            params: [
                {
                    name: 'count',
                    type: 'number',
                    value: '10',
                },
            ],
        },
        {
            name: 'onDataFileEntry',
            params: [
                {
                    name: 'name',
                    type: 'text',
                    value: 'file',
                },
                {
                    name: 'type',
                    type: 'number',
                    value: '1',
                },
                {
                    name: 'isNew',
                    type: 'checkbox',
                    checked: true,
                },
            ],
        },
        {
            name: 'performMapLoadFunction',
            params: [
                {
                    name: 'idx',
                    type: 'number',
                    value: '47',
                },
            ],
        },
        {
            name: 'endDataFileEntries',
        },
        {
            name: 'startInitFunction',
            params: [
                {
                    name: 'type',
                    type: 'text',
                    value: 'MOCK_FUNCTION',
                },
            ],
        },
        {
            name: 'startInitFunctionOrder',
            params: [
                {
                    name: 'type',
                    type: 'text',
                    value: 'MOCK_FUNCTION',
                },
                {
                    name: 'order',
                    type: 'number',
                    value: '1',
                },
                {
                    name: 'count',
                    type: 'number',
                    value: '10',
                },
            ],
        },
        {
            name: 'initFunctionInvoking',
            params: [
                {
                    name: 'type',
                    type: 'text',
                    value: 'MOCK_FUNCTION',
                },
                {
                    name: 'name',
                    type: 'text',
                    value: 'helloWorld',
                },
                {
                    name: 'idx',
                    type: 'number',
                    value: '6',
                },
            ],
        },
        {
            name: 'initFunctionInvoked',
            params: [
                {
                    name: 'type',
                    type: 'text',
                    value: 'MOCK_FUNCTION',
                },
                {
                    name: 'name',
                    type: 'text',
                    value: 'helloWorld',
                },
            ],
        },
        {
            name: 'endInitFunction',
            params: [
                {
                    name: 'type',
                    type: 'text',
                    value: 'MOCK_FUNCTION',
                },
            ],
        },
    ]);
