import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Message } from "discord.js";

export default class Welcome {
  private constructor(){}
  static sendWelcomeMessage(member: GuildMember) {
      (member.guild.channels.cache.get("959918982201229342") as TextChannel)
        ?.send({
            embeds:[
                new MessageEmbed()
                    .setTitle(`Un nouvel arrivant !`)
                    .setDescription(`Bienvenue à ${member}!\n\n Vous êtes le membre numéro ${member.guild.memberCount}!\n\nCes membres vous souhaitent la bienvenue:`)
                    .setImage(member.avatarURL() || "")
                    .setColor("#5267f5")
            ],
            components:[
                new MessageActionRow({
                    components: [
                        new MessageButton()
                            .setLabel("Souhaiter la bienvenue")
                            .setCustomId("sayWelcome")
                            .setStyle("PRIMARY")
                    ]
                })
            ]
            
        });
  }

  static sayWelcome(interaction: ButtonInteraction) :void {
      let message = interaction.message as Message;
      if(!message.embeds[0].description?.includes(interaction.member?.toString() || "#")){
          
        message.embeds[0].setDescription(message.embeds[0].description + `\n - ${interaction.member}`)
        message.edit({
            embeds: [
                message.embeds[0]
            ]
        });
        interaction.reply({content: `Vous lui avez souhaité la bienvenue.` , ephemeral: true});
        return;
      }
      interaction.reply({content: `Vous lui avez déjà souhaité la bienvenue.` , ephemeral: true});
  }
}