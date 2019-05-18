class Stopwatch {
    start = () => {
        this.stop();
        this.startTime = Date.now();
        this.pauseDuration = 0;
        document.addEventListener('visibilitychange', this.handleVisibilityChange, { passive: true });
        this.handleVisibilityChange();
    };

    read = () => {
        return Date.now() - this.startTime - this.pauseDuration;
    };

    stop = () => {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange, { passive: true });
        return this.read();
    };

    handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            this.pauseStartTime = Date.now();
        } else if (document.visibilityState === 'visible' && this.pauseStartTime) {
            this.pauseDuration += Date.now() - this.pauseStartTime;
        }
    };
}

export function createStopwatch() {
    return new Stopwatch();
}
