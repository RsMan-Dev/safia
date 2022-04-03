import { ButtonInteraction, CommandInteraction, CommandInteractionOption, GuildMember, MessageActionRow, MessageButton, MessageEmbed, Permissions } from "discord.js";
import Logger from "../utils/logger";

export default class Sanction {
    private constructor() { }
    static async ban(interaction: CommandInteraction) {
        const member = interaction.options.getMember("user");
        const reasons = interaction.options.getString("reason");
        const guildMember = member as GuildMember;

        if (!interaction.memberPermissions?.has(Permissions.FLAGS.BAN_MEMBERS)) {
            interaction.reply("You don't have ban permission!");
            return;
        }
        if (!guildMember.bannable) {
            interaction.reply("I can't ban this user!");
            return;
        }
        const embed = new MessageEmbed()
            .setTitle("Sanction")
            .setDescription(`${guildMember.user.username} has been banned!`)
            .addField("Reason", reasons!)
            .setColor("#5267f5")

        interaction.reply({ embeds: [embed] });
        await guildMember.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Sanction")
                    .setDescription(`You have been banned from ${guildMember.guild.name}`)
                    .addField("Reason", reasons!)
                    .setColor("#5267f5")
            ]
        }).catch(Logger.dump);
        await guildMember.ban({ reason: reasons || undefined });

    }
    static async kick(interaction: CommandInteraction) {

        const member = interaction.options.getMember("user");
        const reasons = interaction.options.getString("reason");
        const guildMember = member as GuildMember;


        if (!interaction.memberPermissions?.has(Permissions.FLAGS.KICK_MEMBERS)) {
            interaction.reply("You don't have kick permission!");
            return;
        }
        if (!guildMember.kickable) {
            interaction.reply("I can't kick this user!");
            return;
        }
        const embed = new MessageEmbed()
            .setTitle("Sanction")
            .setDescription(`${guildMember.user.username} has been kicked!`)
            .addField("Reason", reasons!)
            .setColor("#5267f5")

        interaction.reply({ embeds: [embed] });
        await guildMember.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Sanction")
                    .setDescription(`You have been kicked from ${guildMember.guild.name}`)
                    .addField("Reason", reasons!)
                    .setColor("#5267f5")
            ]
        }).catch(Logger.dump);

        await guildMember.kick();
    }

    static async softban(interaction: CommandInteraction) {

        const member = interaction.options.getMember("user");
        const reasons = interaction.options.getString("reason");
        const guildMember = member as GuildMember;

        if (!interaction.memberPermissions?.has(Permissions.FLAGS.BAN_MEMBERS)) {
            interaction.reply("You don't have ban permission!");
            return;
        }
        if (!guildMember.bannable) {
            interaction.reply("I can't ban this user!");
            return;
        }
        const embed = new MessageEmbed()
            .setTitle("Sanction")
            .setDescription(`${guildMember.user.username} has been softbanned!`)
            .addField("Reason", reasons!)
            .setColor("#5267f5")

        interaction.reply({ embeds: [embed] });
        await guildMember.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Sanction")
                    .setDescription(`You have been softbanned from ${guildMember.guild.name}`)
                    .addField("Reason", reasons!)
                    .setColor("#5267f5")
            ]
        }).catch(Logger.dump);

        await guildMember.ban({ reason: reasons || undefined , days: 7 });
        await guildMember.guild.members.unban(guildMember.id);






    }





}