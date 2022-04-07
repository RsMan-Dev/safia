import { Client, Intents, Interaction } from "discord.js";
import Logger from "./utils/logger";
import dotenv from "dotenv";
import Environment from "./environment/environment";
import CommandManager from "./managers/command_manager";
import ButtonManger from "./managers/button_manager";
import MemberManager from "./managers/member_manager";
import SelectmenuManager from "./managers/select_menu_manager";
import { PrismaClient } from "@prisma/client";
import GuildManager from "./managers/guild_manager";

dotenv.config();

let {FLAGS} = Intents;

export let client = new Client({intents: [
    FLAGS.GUILDS,
    FLAGS.GUILD_MEMBERS,
    FLAGS.DIRECT_MESSAGES,
    FLAGS.GUILD_MESSAGES
]});

client.on("interactionCreate", (interaction : Interaction) => {
    if(interaction.isCommand()) CommandManager.dispatch(interaction);
    if(interaction.isButton()) ButtonManger.dispatch(interaction);
    if(interaction.isSelectMenu()) SelectmenuManager.dispatch(interaction);
})

client.on("ready", () => {
    Logger.info("Bot démarré");
    Logger.info("Mon lien d'invitation est : https://discord.com/api/oauth2/authorize?client_id=959554157503733821&permissions=8&scope=bot%20applications.commands")
});

client.on("guildMemberAdd", MemberManager.onAdd);
client.on("guildMemberRemove", MemberManager.onDelete);

client.on("guildCreate", GuildManager.onCreate);
client.on("guildDelete", GuildManager.onDelete);

client.on("guildMemberUpdate", MemberManager.onUpdate);

client.login(Environment.get.bot_token);

