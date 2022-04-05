import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Message, PartialGuildMember } from "discord.js";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";

export default class UserUpdateMessage {
  private constructor(){}
  static async sendWelcomeMessage(member: GuildMember) {
      let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: member.guild.id } } });
      
      if(conf?.welcome_channel_id){
        (member.guild.channels.cache.get(conf.welcome_channel_id) as TextChannel)
            ?.send({
                embeds:[
                    new MessageEmbed()
                        .setTitle(conf.welcome_title)
                        .setDescription(conf.welcome_message.replaceAll("{user}", member.toString()).replaceAll("{user_number}", member.guild.memberCount.toString()).replaceAll("{user_list}", ""))
                        .setImage(member.avatarURL() || "")
                        .setColor(`#${conf.welcome_color}`)
                ],
                components:[
                    new MessageActionRow({
                        components: [
                            new MessageButton()
                                .setLabel("Say welcome")
                                .setCustomId("sayWelcome")
                                .setStyle("PRIMARY")
                        ]
                    })
                ]
            });
      }
  }

    static async sayWelcome(interaction: ButtonInteraction) {
        if(!interaction.guild || !interaction.member) return;
        let message = interaction.message as Message;
        if(!message.embeds[0].description?.includes(interaction.member.toString() || "#")){
            message.embeds[0].setDescription(message.embeds[0].description + `\n - ${interaction.member.toString()}`);
            interaction.update({
                embeds: [
                    message.embeds[0]
                ]
            });
            return;
        }
        interaction.reply({content: `You have already said welcome` , ephemeral: true});
    }





  static async sendGoodbyeMessage(member: GuildMember | PartialGuildMember) {
    let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: member.guild.id } } });
    if(conf?.goodbye_channel_id){
        (member.guild.channels.cache.get(conf.goodbye_channel_id) as TextChannel)
            ?.send({
                embeds:[
                    new MessageEmbed()
                        .setTitle(conf.goodbye_title)
                        .setDescription(conf.goodbye_message.replaceAll("{user}", member.toString()).replaceAll("{user_number}", member.guild.memberCount.toString()).replaceAll("{user_list}", ""))
                        .setImage(member.avatarURL() || "")
                        .setColor(`#${conf.goodbye_color}`)
                ],
                components:[
                    new MessageActionRow({
                        components: [
                            new MessageButton()
                                .setLabel("Say goodbye")
                                .setCustomId("sayGoodbye")
                                .setStyle("PRIMARY")
                        ]
                    })
                ]
            });
    }
    
}

static async sayGoodbye(interaction: ButtonInteraction) {
    if(!interaction.guild || !interaction.member) return;
    let message = interaction.message as Message;
    if(!message.embeds[0].description?.includes(interaction.member.toString() || "#")){
        message.embeds[0].setDescription(message.embeds[0].description + `\n - ${interaction.member.toString()}`);
        interaction.update({
            embeds: [
                message.embeds[0]
            ]
        });
        return;
    }
    interaction.reply({content: `You have already said goodbye.` , ephemeral: true});
}

    static async sendBoostMessaget(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember | PartialGuildMember) {

        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: oldMember.guild.id } } });
        const guild = newMember.guild;
      
        if (!oldStatus && newStatus) {
            if(conf?.boost_channel_id){
            (newMember.guild.channels.cache.get(conf.boost_channel_id) as TextChannel)?.send({embeds: [
                new MessageEmbed()
                    .setTitle(conf!.boost_title)
                    .setDescription(conf!.boost_message.replaceAll("{user}", newMember!.toString()).replaceAll("{boost_number}", `${newMember.guild!.premiumSubscriptionCount}`).replaceAll("{user_list}", `\n - ${newMember}`))
                    .setImage((newMember as GuildMember).avatarURL() || "")
                    .setColor(`#${conf!.boost_color}`)] });
          
        } 
    }
    }

    }
