import { SelectMenuInteraction } from "discord.js";
import AutoRole from "../actions/autorole";
import Configuration from "../actions/configuration";
import { ConfigurationSelects } from "../enums/configuration_page";

export default class SelectmenuManager{
    private constructor(){}
    static dispatch(interaction: SelectMenuInteraction){
        switch(interaction.customId.split("#")[0]){
            case "selectRole": AutoRole.menuRole(interaction); return;
            case ConfigurationSelects.main_config_select: Configuration.setPageFromMainMenu(interaction); return;
            case ConfigurationSelects.welcome_message_id_config_select: Configuration.setWelcomeMessagesChannelId(interaction); return;
            case ConfigurationSelects.goodbye_message_id_config_select: Configuration.setGoodbyeMessagesChannelId(interaction); return;
            default: interaction.reply({content: "wip", ephemeral: true}); return;
        }
    }
}