import Environment from "../environment/environment"

export default class Logger{
    private static isLoggable(level : LogLevels) : boolean {
        if(Environment.get.dev){
            return true;
        } else {
            if(level == LogLevels.info) return true;
        }
        return false;
    }

    private static get whiteColor() : string { return "\x1b[37m"; }
    private static get blueColor() : string { return "\x1b[36m"; }

    private static getLogColor(level: LogLevels) : string {
        switch(level){
            case LogLevels.debug: return "\x1b[35m";
            case LogLevels.info: return "\x1b[37m";
            case LogLevels.warn: return "\x1b[33m";
            case LogLevels.error: return "\x1b[31m";
        }
    }

    static info(message: string) : void {
        Logger.log(message, LogLevels.info);
    }
    static warn(message: string) : void {
        Logger.log(message, LogLevels.warn);
    }
    static error(message: string) : void {
        Logger.log(message, LogLevels.error);
    }
    static log(message: string, level = LogLevels.debug) : void {
        if(Logger.isLoggable(level)) console.log(`${Logger.getLogColor(level)}[${Logger.blueColor}BOT${Logger.getLogColor(level)}] ` + message)
    }
    static dump(obj: any, level = LogLevels.debug) : void {
        if(Logger.isLoggable(level)) console.log(
            `${Logger.getLogColor(level)}[${Logger.blueColor}BOT${Logger.getLogColor(level)}] - DUMPING OBJECT => ${Logger.whiteColor}`,
            obj
        )
    }
}

export enum LogLevels{
    debug,
    info,
    warn,
    error,
}