import { GuildMember, PartialGuildMember } from "discord.js";
import UserUpdateMessage, { UserUpdateMessageType } from "../actions/user_update_message";
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

        UserUpdateMessage.sendUpdateMessage(member, UserUpdateMessageType.welcome);
    }
    static async onDelete(member: GuildMember | PartialGuildMember){
        await prisma_instance.guild_user.deleteMany({where: {user_id: member.id}});

        UserUpdateMessage.sendUpdateMessage(member as GuildMember, UserUpdateMessageType.goodbye);
    }

    static async onUpdate(oldMember : GuildMember | PartialGuildMember, newMember: GuildMember | PartialGuildMember){
        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;

        if (!oldStatus && newStatus)
        UserUpdateMessage.sendUpdateMessage(newMember as GuildMember, UserUpdateMessageType.boost);
    }

}