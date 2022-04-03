import { Guild } from "discord.js";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";

export default class GuildManager{
   private constructor(){} 

    static async onCreate(guild: Guild){
        Logger.dump("guild create")
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: guild.id } } });
        let db_guild = await prisma_instance.guilds.findFirst({where: {  id: guild.id } });
        if(!conf){
            conf = await prisma_instance.configurations.create({
                data: {
                    welcome_message: "Welcome {user} !\n\nYou are the member n°{user_number}\n\nThese members says welcome to you : {user_list}",
                    goodbye_message: "Goodbye {user} !\n\nWe are now {user_number} on the server !\n\nThese members says goodbye to you : {user_list}",
                    boost_message: "Thanks to {user} for boosting the server!\n\nThese members says goodbye to you : {user_list}",
                }
            })
        }
        if(!db_guild){
            db_guild = await prisma_instance.guilds.create({
                data: {
                    id: guild.id,
                    name: guild.name,
                    configuration_id: conf.id,
                }
            })
        }
        Logger.dump(conf, db_guild);
    }

    static async onDelete(guild: Guild){
        await prisma_instance.role_permission.deleteMany({where: { role: { guild_id: guild.id } } });
        await prisma_instance.roles.deleteMany({where: { guild_id: guild.id } });
        await prisma_instance.guild_user.deleteMany({where: { guild_id: guild.id }});
        await prisma_instance.rules.deleteMany({where: {configuration: { guild: { id: guild.id } } } });
        await prisma_instance.media_channels.deleteMany({where: {configuration: { guild: { id: guild.id } } } });
        await prisma_instance.anti_link_channels.deleteMany({where: {configuration: { guild: { id: guild.id } } } });
        await prisma_instance.level_roles.deleteMany({where: {configuration: { guild: { id: guild.id } } } });
        await prisma_instance.configurations.deleteMany({where: { guild: {id: guild.id} } });
    }
}