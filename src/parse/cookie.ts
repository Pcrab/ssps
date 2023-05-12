const parseCookie = (cookie: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const cookies = cookie.split(";");
    for (const cookie of cookies) {
        const [key, value = ""] = cookie.split("=");
        if (!key) {
            continue;
        }
        result[key.trim()] = value;
    }
    return result;
};

const stringifyCookies = (cookies: Record<string, string>): string => {
    const result: string[] = [];
    for (const [key, value] of Object.entries(cookies)) {
        result.push(`${key}=${value}`);
    }
    return result.join("; ");
};

export { parseCookie, stringifyCookies };
