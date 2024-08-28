declare interface NuiHandoverData {
    vars: {
        playerName: string;
        serverName: string;
    };

    paths: {
        images: string[];
        music: string[];
        videos: string[];
        logo?: string | undefined;
    };

    config: {
        style: string;
        background: string;
        backgroundBrightness: number;
        textColor: string;
        primaryColor: string;
        secondaryColor: string;
        shadowColor: string;
        fontFamily: string;
        logo: boolean;
        serverMessage: string;
        primaryBar: boolean;
        secondaryBar: boolean;
        loadingAction: boolean;
        finishingMessage: string;
        logLine: boolean;
        finishedMessage: string;
        finishedLine: string;
        audioControls: boolean;
        rememberVolume: boolean;
        errorLog: boolean;
        initialAudioVolume: number;
        music: boolean;
        musicShuffle: boolean;
        imageRate: number;
        imageShuffle: boolean;
        videoShuffle: boolean;
        embedLink: string;
        embedAccess: boolean;
    };
}
