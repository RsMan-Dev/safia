import { PrismaClient } from "@prisma/client";
import Logger, { LogLevels } from "./logger";
declare global {
    var golbal_prisma_instance: PrismaClient;
}

let prisma_instance: PrismaClient;

if (!global.golbal_prisma_instance) {
    Logger.log("generating new Prisma instance", LogLevels.debug)
    global.golbal_prisma_instance = new PrismaClient();
}

prisma_instance = global.golbal_prisma_instance;

export default prisma_instance;