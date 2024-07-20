interface LoadscreenEvent {
    readonly eventName: string;
}

declare namespace LoadscreenEvents {
    interface LoadProgress extends LoadscreenEvent {
        readonly eventName: 'loadProgress';
        readonly loadFraction: number;
    }

    interface OnLogLine extends LoadscreenEvent {
        readonly eventName: 'onLogLine';
        readonly message: string;
    }

    interface StartDataFileEntries extends LoadscreenEvent {
        readonly eventName: 'startDataFileEntries';
        readonly count: number;
    }

    interface OnDataFileEntry extends LoadscreenEvent {
        readonly eventName: 'onDataFileEntry';
        readonly name: string;
        readonly type: number;
        readonly isNew: boolean;
    }

    interface PerformMapLoadFunction extends LoadscreenEvent {
        readonly eventName: 'performMapLoadFunction';
        readonly idx: number;
    }

    interface EndDataFileEntries extends LoadscreenEvent {
        readonly eventName: 'endDataFileEntries';
    }

    interface StartInitFunction extends LoadscreenEvent {
        readonly eventName: 'startInitFunction';
        readonly type: string;
    }

    interface StartInitFunctionOrder extends LoadscreenEvent {
        readonly eventName: 'startInitFunctionOrder';
        readonly type: string;
        readonly order: number;
        readonly count: number;
    }

    interface InitFunctionInvoking extends LoadscreenEvent {
        readonly eventName: 'initFunctionInvoking';
        readonly type: string;
        readonly name: string;
        readonly idx: number;
    }

    interface InitFunctionInvoked extends LoadscreenEvent {
        readonly eventName: 'initFunctionInvoked';
        readonly type: string;
        readonly name: string;
    }

    interface EndInitFunction extends LoadscreenEvent {
        readonly eventName: 'endInitFunction';
        readonly type: string;
    }
}
