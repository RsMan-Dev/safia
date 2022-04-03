import { GuildMember } from "discord.js";
import Welcome from "../actions/welcome";
import prisma_instance from "../utils/prisma_instance";

export default class MemberManager{
    private constructor(){}
    static async onAdd(member: GuildMember){
        let u = await prisma_instance.users.findFirst({where:{id: member.id}});
        if(!u) u = await prisma_instance.users.create({data:{id: member.id}});
        await prisma_instance.guild_user.create({data:{user_id: u.id, guild_id: member.guild.id}});

        Welcome.sendWelcomeMessage(member);
    }
    static async onDelete(member: GuildMember){
        await prisma_instance.guild_user.deleteMany({where: {user_id: member.id}});

        
        Welcome.sendGoodbyeMessage(member);
    }
}