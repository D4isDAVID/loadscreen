export function isBrowserEnv() {
    return !('invokeNative' in window);
}
