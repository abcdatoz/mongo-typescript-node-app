interface AuthConfig {
    secret: string;
    expiresIn: string; // '60m' o similar
    refreshSecret: string;
    refreshExpiresIn: string; // '7d' o similar
}

const authConfig: AuthConfig = {
    secret: process.env.JWT_SECRET || "oursecret",
    expiresIn: "60m",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
    refreshExpiresIn: "7d",
};

export default authConfig;
