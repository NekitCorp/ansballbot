export function assertUnreachable(x: never): never {
    throw new Error(`Didn't expect ${x} to get here`);
}

export function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDate(from: Date, to: Date): Date {
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

export function getEnv(name: string, defaultValue?: string): string {
    const value = process.env[name] || defaultValue;

    if (!value) {
        throw new Error(`Env variable ${name} is not defined`);
    }

    return value;
}
