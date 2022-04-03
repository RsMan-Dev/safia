import YAML from "yaml";
import fs from "fs";

export default class Environment{
    private static _env ?: EnvData;
    static get get() : EnvData {
        if(Environment._env == undefined){
            let yamlData : EnvData;
            if(process.env.NODE_ENV != "prod"){
                yamlData = YAML.parse(fs.readFileSync("environment/dev.yml").toString());
            } else {
                yamlData = YAML.parse(fs.readFileSync("environment/prod.yml").toString());
            }
            Environment._env = {...yamlData, dev: process.env.NODE_ENV != "prod"} as EnvData;

            return Environment.get;
        }else{
            return Environment._env;
        }
    }
}

interface EnvData{
    bot_token: string,
    guild_id: string,
    client_id: string,
    dev: boolean
}