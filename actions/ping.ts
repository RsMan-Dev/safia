import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";

export default class Ping{
    private constructor(){}
    static async trigger(interaction: CommandInteraction | ButtonInteraction){

        const start = Date.now();
        const sentMessage = await interaction.reply('Pong!').then(async () => {
            const end = Date.now();
            const time = end - start 
            const botLatency = `${'```'}\n ${time}ms   ${'```'}`
            const apiLatency = `${'```'}\n ${Math.round(interaction.client.ws.ping)}ms   ${'```'}`
            const embed = new MessageEmbed()
                .setTitle('Pong! 🏓')
                .setColor("#8e48f7")
                .addField('Latence du bot', botLatency, true)
                .addField('Latence de l\'api', apiLatency, true)
                .setTimestamp()
            
                .setFooter({text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`})
    
                await interaction.editReply({
                    content: null,
                    embeds: [embed]
                })
        })
9
    }



    // Ping Button exemple.
    static createButton(interaction: CommandInteraction | ButtonInteraction){

        interaction.reply({
            content: "test",
            components: [
                new MessageActionRow({
                    components: [
                        new MessageButton()
                            .setCustomId('ping')
                            .setLabel('Ping')
                            .setStyle('DANGER')
                    ]
                })
            ]
        }
        );
    }
}