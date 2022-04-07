import { ButtonInteraction, GuildMember } from "discord.js";
import Configuration from "../actions/configuration";
import Moderation from "../actions/moderation";
import Ping from "../actions/ping";
import Welcome from "../actions/user_update_message";
import ConfigurationPage, { ConfigurationButtons } from "../enums/configuration_page";
import Permissions from "../enums/Permission";

export default class ButtonManger{
    private constructor(){}
    static async dispatch(interaction: ButtonInteraction){
        switch(interaction.customId){
            case "ping": Ping.trigger(interaction); return;
            case "sayWelcome": Welcome.sayWelcome(interaction); return;
            case "sayGoodbye": Welcome.sayGoodbye(interaction); return;
            case ConfigurationButtons.welcome_message_color_config_button:
            case ConfigurationButtons.welcome_message_text_config_button:
            case ConfigurationButtons.welcome_message_title_config_button:
                Configuration.setWelcomeMessageTextData(interaction); return;
            case ConfigurationButtons.goodbye_message_color_config_button:
            case ConfigurationButtons.goodbye_message_text_config_button:
            case ConfigurationButtons.goodbye_message_title_config_button:
                Configuration.setGoodbyeMessageTextData(interaction); return;
            case ConfigurationButtons.boost_message_color_config_button:
            case ConfigurationButtons.boost_message_text_config_button:
            case ConfigurationButtons.boost_message_title_config_button:
                Configuration.setBoostMessageTextData(interaction); return;
            case ConfigurationButtons.return_to_main_menu_config_button: 
                if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.config)) {
                    interaction.reply({content: "You dont have required permission", ephemeral: true});
                    return;
                }
                interaction.update( ConfigurationPage.main ); return;


            default: interaction.reply({content: "wip", ephemeral: true}); return;
            
        }
    }
}