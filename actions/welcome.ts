import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Message } from "discord.js";
import prisma_instance from "../utils/prisma_instance";

export default class Welcome {
  private constructor(){}
  static async sendWelcomeMessage(member: GuildMember) {
      let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: member.guild.id } } });
      
      if(conf?.welcome_channel_id){
        (member.guild.channels.cache.get(conf.welcome_channel_id) as TextChannel)
            ?.send({
                embeds:[
                    new MessageEmbed()
                        .setTitle(conf.welcome_title)
                        .setDescription(conf.welcome_message.replace("{user}", member.toString()).replace("{user_number}", member.guild.memberCount.toString()).replace("{user_list}", ""))
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
            message.embeds[0].setDescription(message.embeds[0].description + "\n" + interaction.member);
            message.edit({
                embeds: [
                    message.embeds[0]
                ]
            });
            interaction.reply({content: `You said welcome.` , ephemeral: true});
            return;
        }
        interaction.reply({content: `You have already said welcome` , ephemeral: true});
    }





  static async sendGoodbyeMessage(member: GuildMember) {
    let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: member.guild.id } } });

    if(conf?.goodbye_channel_id){
        (member.guild.channels.cache.get(conf.goodbye_channel_id) as TextChannel)
            ?.send({
                embeds:[
                    new MessageEmbed()
                        .setTitle(conf.goodbye_title)
                        .setDescription(conf.goodbye_message.replace("{user}", member.toString()).replace("{user_number}", member.guild.memberCount.toString()).replace("{user_list}", ""))
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
        message.embeds[0].setDescription(message.embeds[0].description + "\n" + interaction.member);
        message.edit({
            embeds: [
                message.embeds[0]
            ]
        });
        interaction.reply({content: `You said goodbye.` , ephemeral: true});
        return;
    }
    interaction.reply({content: `You have already said goodbye.` , ephemeral: true});
}

  
}