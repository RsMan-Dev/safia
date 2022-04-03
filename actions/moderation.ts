import { BaseGuildTextChannel, ButtonInteraction, CommandInteraction, GuildMember, GuildMemberRoleManager, MessageActionRow, MessageButton, MessageEmbed, Permissions} from "discord.js";
import { PermissionValue } from "../enums/Permission";
import prisma_instance from "../utils/prisma_instance";

export default class Moderation{
    private constructor(){}
    static async clear(interaction: CommandInteraction){
        const amount = interaction.options.getInteger("amount");;

        if (!interaction.memberPermissions?.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            interaction.reply("You don't have manage_messages permission!");
            return;
        }

        if(amount! > 100){
            interaction.reply('Veuillez entrer un nombre de message inférieur à 100.');
            return;
        }
        const messages = await interaction.channel!.messages.fetch({limit: amount!});
        await (interaction.channel as BaseGuildTextChannel)!.bulkDelete(messages);
        interaction.reply({content: `${amount} messages ont été supprimés.`, ephemeral: true});
    }

    static async checkPermission(member: GuildMember, perm: PermissionValue) : Promise<boolean>{
        if(member.permissions.has(perm.discord_name)) return true;
        if(await prisma_instance.roles.count({
            where:{
                id:{
                    in: member.roles.cache.map(r=>r.id)
                },
                role_permission:{
                    every:{
                        permission:{
                            name: perm.name
                        }
                    }
                },
                guild_id: member.guild.id
            },
        }) >= 1) return true;
        return false;
    }

}