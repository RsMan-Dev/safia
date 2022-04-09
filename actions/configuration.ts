import { ButtonInteraction, CommandInteraction, GuildMember, Message, SelectMenuInteraction } from "discord.js";
import ConfigurationPage, { ConfigurationButtons, ConfigurationSelectMenuMain } from "../enums/configuration_page";
import Permissions from "../enums/Permission";
import { GuildConfigBaseData } from "../managers/guild_manager";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";
import Moderation from "./moderation";
import { UserUpdateMessageType } from "./user_update_message";

export default class Configuration{
    private constructor(){}
    static async init(interaction: CommandInteraction) {
        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.config)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        interaction.reply(ConfigurationPage.main);
    }

    static async setPageFromMainMenu(interaction: SelectMenuInteraction){
        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.config)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        for(let v of interaction.values){
            switch(v as ConfigurationSelectMenuMain){
                case ConfigurationSelectMenuMain.cancel: 
                    (interaction.message as Message).delete();
                    interaction.reply({content: "Configuration ended", ephemeral: true});
                    continue;
                case ConfigurationSelectMenuMain.welcome_message: interaction.update(await ConfigurationPage.user_update_message(interaction, UserUpdateMessageType.welcome) || {}); continue;
                case ConfigurationSelectMenuMain.goodbye_message: interaction.update(await ConfigurationPage.user_update_message(interaction, UserUpdateMessageType.goodbye) || {}); continue;
                case ConfigurationSelectMenuMain.boost_message: interaction.update(await ConfigurationPage.user_update_message(interaction, UserUpdateMessageType.boost) || {}); continue;
                default: interaction.reply({content: "wip", ephemeral: true}); continue;
            } 
        }
    }
    
    static async setUserUpdateMessagesChannelId(interaction: SelectMenuInteraction, type: UserUpdateMessageType){
        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.config)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        let value;
        for(let v of interaction.values){value = v; break;}
        if(value == "none"){
            await prisma_instance.configurations.updateMany({ where:{ guild: { id: interaction.guild!.id } }, data: { [`${type}_channel_id`]: null } })
        } else {
            await prisma_instance.configurations.updateMany({ where:{ guild: { id: interaction.guild!.id } }, data: { [`${type}_channel_id`]: value } })
        }
        (interaction.message as Message).edit(await ConfigurationPage.user_update_message(interaction, type) || {});
        interaction.reply({content: "Channel set", ephemeral: true});
    }
    
    static async setUserUpdateMessagesTextData(interaction: ButtonInteraction, type: UserUpdateMessageType){
        if (!await Moderation.checkPermission(interaction.member as GuildMember, Permissions.config)) {
            interaction.reply({content: "You dont have required permission", ephemeral: true});
            return;
        }
        let filter = (message : Message) => { return (message.member as GuildMember).id == (interaction.member as GuildMember).id; }
        let options = { max: 1, time: 72000000 }
        let collector = (interaction.message as Message).channel.createMessageCollector({filter: filter, ...options});
        collector.on("collect", async (message)=>{
            switch(interaction.customId){
                case ConfigurationButtons[`${type}_message_color_config_button`]:
                    if(/^[0-9a-fA-F]{6}/i.test(message.content)) {
                        await prisma_instance.configurations.updateMany({ where:{ guild: { id: interaction.guild!.id } }, data: { [`${type}_color`]: message.content } });
                    } break;
                case ConfigurationButtons[`${type}_message_text_config_button`]:
                    await prisma_instance.configurations.updateMany({ where:{ guild: { id: interaction.guild!.id } }, data: { [`${type}_message`]: message.content } }); break;
                case ConfigurationButtons[`${type}_message_title_config_button`]:
                    if(message.content.length <= 192) {
                        await prisma_instance.configurations.updateMany({ where:{ guild: { id: interaction.guild!.id } }, data: { [`${type}_title`]: message.content } });
                    } break;
            }
            (interaction.message as Message).edit(await ConfigurationPage.user_update_message(interaction, type) || {});
            message.delete();

        });
        let example = "";
        switch(interaction.customId){
            case ConfigurationButtons.welcome_message_color_config_button:
                example = "Only 6 characters allowed, HEX colors, Characters must be between A-F, or 0-9.\nExamples: red = FF0000, blue = 0000FF, green = 00FF00."; break;
            case ConfigurationButtons.welcome_message_text_config_button:
                example = "Placeholders allowed: {user}, {user_number}, {user_list}\nExample data: \n" + GuildConfigBaseData[`${type}_message`]; break;
            case ConfigurationButtons.welcome_message_title_config_button:
                example = "Example data: " + GuildConfigBaseData[`${type}_title`]; break;
        }
        interaction.reply({content: "Now give me content in this channel simply by sending message.\nYou have 20minutes.\n\n"+example, ephemeral: true});
    }
}