import { GuildMember, PartialGuildMember } from "discord.js";
import Welcome from "../actions/welcome";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";

export default class MemberManager{
    private constructor(){}
    static async onAdd(member: GuildMember){
        let u = await prisma_instance.users.upsert({
             where: {id: member.id},
             create: {id: member.id},
             update: {}
        });
        await prisma_instance.guild_user.upsert({
             where: {guild_id_user_id: { user_id: u.id, guild_id: member.guild.id }},
             create: { user_id: u.id, guild_id: member.guild.id },
             update: {}
        });

        Welcome.sendWelcomeMessage(member);
    }
    static async onDelete(member: GuildMember | PartialGuildMember){
        await prisma_instance.guild_user.deleteMany({where: {user_id: member.id}});

        Welcome.sendGoodbyeMessage(member);
    }
}