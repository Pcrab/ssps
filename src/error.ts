class SpsError extends Error {
    public toJSON(): string {
        return JSON.stringify({
            message: this.message,
            stack: this.stack,
        });
    }
}

export { SpsError };
