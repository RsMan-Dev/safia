import { BaseGuildTextChannel, ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, Permissions} from "discord.js";

export default class Moderation{
    private constructor(){}
    static async clear(interaction: CommandInteraction){
        // Clear the amount seleted of messages.
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
        interaction.reply(`${amount} messages ont été supprimés.`);


        
    
    
    
    }
}