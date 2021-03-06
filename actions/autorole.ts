import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SelectMenuInteraction, Permissions, GuildMember, GuildMemberRoleManager} from "discord.js";
import { client } from "..";
import Logger from "../utils/logger";
export default class AutoRole{
    private constructor(){}
    static async send(interaction: SelectMenuInteraction | CommandInteraction){
        Logger.log("Le fichier a bien été lu");
        if (!interaction.memberPermissions?.has(Permissions.FLAGS.MANAGE_GUILD)) {
            interaction.reply("Vous pouvez éxécuter cette commande que si vous avez la permission `Manage Server`");
            return;
        }



		// START EMOJI
		const Html = client.emojis.cache.find(emoji => emoji.name === "HTML");
		const C = client.emojis.cache.find(emoji => emoji.name === "c_");
		const Golang = client.emojis.cache.find(emoji => emoji.name === "go");
		const Js = client.emojis.cache.find(emoji => emoji.name === "js");
		const Python = client.emojis.cache.find(emoji => emoji.name === "python");
		const Ts = client.emojis.cache.find(emoji => emoji.name === "ts");
		// END EMOJI$

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('selectRole')
					.setPlaceholder('Choisissez vos rôles')
					.setMinValues(1)
					.setMaxValues(6)
					.addOptions([
						{
							label: 'JavaScript',
							description: 'Soit reconnu en tant que développeur JavaScript.',
							value: 'first_option',
							emoji: Js
						},
						{
							label: 'Python',
							description: 'Soit reconnu en tant que développeur Python.',
							value: 'second_option',
							emoji: Python
						},
						{
							label: 'Html/Css',
							description: 'Soit reconnu en tant que développeur Html/Css.',
							value: 'third_option',
							emoji: Html
						},
                        {
							label: 'TypeScript',
							description: 'Soit reconnu en tant que développeur TypeScript.',
							value: "fourth_option",
							emoji: Ts
						},
                        {
                            label: 'C#',
                            description: 'Soit reconnu en tant que développeur C#.',
                            value: "fifth_option",
							emoji: C
                        },
                        {
                            label: 'Go',
                            description: 'Soit reconnu en tant que développeur Golang.',
                            value: "sixth_option",
							emoji: Golang
                        },
					]),
			);

		await interaction.reply({ content: 'Succesfully send', ephemeral:true });
        await interaction.channel?.send({ content: 'Choisissez vos rôles ci dessous !', components: [row] });
	}

    static async menuRole(interaction: SelectMenuInteraction){

		// START ROLE
		let Js = interaction.guild!.roles.cache.find(r => r.id === "959921432706556015")
		let Python = interaction.guild!.roles.cache.find(r => r.id === "959921608808599612")
		let Html = interaction.guild!.roles.cache.find(r => r.id === "959921470774075444")
		let Ts = interaction.guild!.roles.cache.find(r => r.id === "959921569986150430")
		let C = interaction.guild!.roles.cache.find(r => r.id === "959921518861750312")
		let Go = interaction.guild!.roles.cache.find(r => r.id === "959921640978939914")
		// END ROLE
		const member = interaction.member
		interaction.values.forEach(v=>{
			switch(v){
				case "first_option": if(Js) (member?.roles as GuildMemberRoleManager).add(Js); break;
				case "second_option": Logger.log('First option'); break;
                case "third_option": Logger.log('First option'); break;
                case "fourth_option": Logger.log('First option'); break;
                case "fifth_option": Logger.log('First option'); break;
                case "sixth_option": Logger.log('First option'); break;
				//member!.roles.add(Js)
			}
		})
    }
}