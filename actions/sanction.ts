import { ButtonInteraction, CommandInteraction, CommandInteractionOption, GuildMember, MessageActionRow, MessageButton, MessageEmbed, Permissions as dPerm } from "discord.js";
import Permissions from "../enums/Permission";
import Logger from "../utils/logger";
import Moderation from "./moderation";

export default class Sanction {
    private constructor() { }
    static async ban(interaction: CommandInteraction) {
        const member = interaction.options.getMember("user");
        const reasons = interaction.options.getString("reason");
        const guildMember = member as GuildMember;

        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.ban)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        if (!guildMember.bannable) {
            interaction.reply({content: "I can't ban this user!", ephemeral: true});
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


        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.kick)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        if (!guildMember.kickable) {
            interaction.reply({content: "I can't kick this user!", ephemeral: true});
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

        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.ban)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        if (!guildMember.bannable) {
            interaction.reply({content: "I can't ban this user!", ephemeral: true});
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


    static async mute(interaction: CommandInteraction){
        const member = interaction.options.getMember("user") as GuildMember;
        let time = interaction.options.getString("time")!.replaceAll(" ", "");
        const reason = interaction.options.getString("reason");

        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.mute)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        if (!member.moderatable) {
            interaction.reply({content: "I can't mute this user!", ephemeral: true});
            return;
        }

        //2d 3h 60m 4
        let days, hours, minutes, seconds;
        let tmp = time!.split("d");
        [days, time] = tmp.length > 1 ? tmp : ["0", tmp[0]];
        tmp = time!.split("h");
        [hours, time] = tmp.length > 1 ? tmp : ["0", tmp[0]];
        tmp = time!.split("m");
        [minutes, time] = tmp.length > 1 ? tmp : ["0", tmp[0]];
        tmp = time!.split("s");
        seconds = tmp[0] == "" ? "0" : tmp[0];
        
        Logger.dump(days, hours, minutes, seconds)

        let millis;
        
        millis = (parseInt(days)*86400+parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds))*1000;
      
        if(isNaN(millis)){
            interaction.reply({content: "Entered time format is incorrect: format: [days]d [hours]h [minutes]m [seconds]s, or [seconds]", ephemeral: true})
            return;
        }

        member.timeout(millis, reason!);

        await member.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Sanction")
                    .setDescription(`You have been muted from ${member.guild.name} for ${millis/1000}seconds`)
                    .addField("Reason", reason!)
                    .setColor("#5267f5")
            ]
        })

        interaction.reply({content: `${member.user.tag} has been muted for ${millis/1000}s\nReason: ${reason}`, ephemeral: true});
    }
}