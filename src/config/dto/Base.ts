export interface thingsType {
    tracker: string;
    gateways: string;
}
export interface Credentials {
    username: string,
    tenant: string,
    password: string,
}
export interface PlatformConfig {
    dap: string;
    mqtt: string;
    credentials: Credentials;
    thingsType: thingsType;
    topics: string[];
}
export interface EnvConfig {
    host: string;
    subroute: string;
    port: number;
}
export interface Config {
    platform: PlatformConfig;
    env: EnvConfig;
}
