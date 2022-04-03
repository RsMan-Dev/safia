import { Client, GuildMember, Intents, Interaction, Message } from "discord.js"
import Logger from "./utils/logger"
import dotenv from "dotenv";
import Environment from "./environment/environment";
import CommandManager from "./managers/command_manager";
import ButtonManger from "./managers/button_manager";
import MemberAddManager from "./managers/member_add_manager";
import SelectmenuManager from "./managers/select_menu_manager";

dotenv.config();

let {FLAGS} = Intents;

export let client = new Client({intents: [
    FLAGS.GUILDS,
    FLAGS.GUILD_MEMBERS,
    FLAGS.DIRECT_MESSAGES
]});


client.on("interactionCreate", (interaction : Interaction) => {
    if(interaction.isCommand()) CommandManager.dispatch(interaction);
    if(interaction.isButton()) ButtonManger.dispatch(interaction);
    if(interaction.isSelectMenu()) SelectmenuManager.dispatch(interaction);
})

client.on("ready", () => {
    Logger.info("Bot démarré");
});

client.on("guildMemberAdd", (member : GuildMember ) => {
    MemberAddManager.dispatch(member);
});

client.login(Environment.get.bot_token);

