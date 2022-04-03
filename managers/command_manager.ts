import { CommandInteraction } from "discord.js";
import Ping from "../actions/ping";
import dotenv from "dotenv";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import Logger from "../utils/logger";
import Environment from "../environment/environment";
import Sanction from "../actions/sanction";
import AutoRole from "../actions/autorole";
import Moderation from "../actions/moderation";

export default class CommandManager{
    private constructor(){}
    static dispatch(interaction: CommandInteraction){
        switch(interaction.commandName){
            case "ping": Ping.trigger(interaction); return;
            case "create_ping_putton": Ping.createButton(interaction); return;
            case "ban": Sanction.ban(interaction); return;
            case "kick": Sanction.kick(interaction); return;
            case "softban": Sanction.softban(interaction); return;
            case "deployrole": AutoRole.send(interaction); return;
            case "clear": Moderation.clear(interaction); return;
        }
    }

    
    /**
     * @warning Do not use this function on main application thread!
     */
     public static registerCommands() {
        dotenv.config();

        const commands = [
            new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),

            new SlashCommandBuilder().setName("create_ping_putton").setDescription("Create ping button who replies with pong!"),

            new SlashCommandBuilder().setName("ban").setDescription("Ban command who ban the user selected!")
            .addUserOption(option => option.setName("user").setDescription("The user to ban!").setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("The reason of the ban!").setRequired(true)),

            new SlashCommandBuilder().setName("kick").setDescription("Kick command who kick the user selected!")
            .addUserOption(option => option.setName("user").setDescription("The user to kick!").setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("The reason of the kick!").setRequired(true)),

            new SlashCommandBuilder().setName("softban").setDescription("softban command who softban the user selected!")
            .addUserOption(option => option.setName("user").setDescription("The user to softban!").setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("The reason of the softban!").setRequired(true)),

            new SlashCommandBuilder().setName("deployrole").setDescription("Deploy autorole select menu!"),

            new SlashCommandBuilder().setName("clear").setDescription("Clear command who clear the amount of message selected!").addIntegerOption(option => option.setName("amount").setDescription("The amount of message to clear!").setRequired(true)),

        ].map((command) => command.toJSON());

        if (
          Environment.get.bot_token === undefined ||
          Environment.get.client_id === undefined ||
          Environment.get.guild_id === undefined
        ) { return; }

        const rest = new REST({ version: "9" }).setToken(Environment.get.bot_token);

        rest.put(`/applications/${Environment.get.client_id}/guilds/${Environment.get.guild_id}/commands`, { body: commands })
            .then(() => Logger.info("Successfully registered application commands."))
            .catch(Logger.error);
    }
}