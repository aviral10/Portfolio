import backupConfig from "./fallbackConfig.json";

class Config {
    private static config = backupConfig;

    public static getConfig() {
        return this.config;
    }

    public static updateConfig(newConfig: any) {
        this.config = newConfig;
    }
}

export default Config;
