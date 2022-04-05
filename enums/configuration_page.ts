import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, MessageOptions, MessagePayload, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import prisma_instance from "../utils/prisma_instance";

export enum ConfigurationSelectMenuMain{
    cancel = "cancel",
    can_ban_roles = "can_ban_roles",
    can_kick_roles = "can_kick_roles",
    can_mute_roles = "can_mute_roles",
    can_config_roles = "can_config_roles",
    auto_attribuable_roles = "auto_attribuable_roles",
    welcome_message = "welcome_message",
    goodbye_message = "goodbye_message",
    boost_message = "boost_message",
    log_channel = "log_channel",
    rules = "rules",
    level = "level",
}

export enum ConfigurationSelects{
    main_config_select = "main_config_select",
    welcome_message_id_config_select = "welcome_message_id_config_select",
    goodbye_message_id_config_select = "goodbye_message_id_config_select",
    boost_message_id_config_select = "boost_message_id_config_select",
}
export enum ConfigurationButtons{
    welcome_message_title_config_button = "welcome_message_title_config_button",
    welcome_message_text_config_button = "welcome_message_text_config_button",
    welcome_message_color_config_button = "welcome_message_color_config_button",
    goodbye_message_title_config_button = "goodbye_message_title_config_button",
    goodbye_message_text_config_button = "goodbye_message_text_config_button",
    goodbye_message_color_config_button = "goodbye_message_color_config_button",
    boost_message_title_config_button = "boost_message_title_config_button",
    boost_message_text_config_button = "boost_message_text_config_button",
    boost_message_color_config_button = "boost_message_color_config_button",
    return_to_main_menu_config_button = "return_to_main_menu_config_button",
}

export default class ConfigurationPage{
    private constructor(){}
    static get main(): MessageOptions {
        return {
            content: "**Beginning of configuration!**\nChoose what you want to configure on this select menu:",
            embeds: [],
            components: [
                new MessageActionRow({
                    components: [
                        new MessageSelectMenu().setCustomId(ConfigurationSelects.main_config_select).setPlaceholder("Select what to config...")
                            .addOptions([
                                {label: "Cancel", description: "Closes menu", value: ConfigurationSelectMenuMain.cancel},
                                {label: "Roles who can ban", description: "Select what roles can ban members", value: ConfigurationSelectMenuMain.can_ban_roles},
                                {label: "Roles who can kick", description: "Select what roles can kick members", value: ConfigurationSelectMenuMain.can_kick_roles},
                                {label: "Roles who can mute", description: "Select what roles can mute members", value: ConfigurationSelectMenuMain.can_mute_roles},
                                {label: "Roles who can config", description: "Select what roles can configure bot", value: ConfigurationSelectMenuMain.can_config_roles},
                                {label: "Auto-attribuable roles", description: "Select what roles are auto-attribuable", value: ConfigurationSelectMenuMain.auto_attribuable_roles},
                                {label: "Welcome message", description: "Configure welcome message", value: ConfigurationSelectMenuMain.welcome_message},
                                {label: "Goodbye message", description: "Configure goodbye message", value: ConfigurationSelectMenuMain.goodbye_message},
                                {label: "Boost message", description: "Configure boost message", value: ConfigurationSelectMenuMain.boost_message},
                                {label: "Log channel", description: "Configure log channel", value: ConfigurationSelectMenuMain.log_channel},
                                {label: "Rules", description: "Configure rules", value: ConfigurationSelectMenuMain.rules},
                                {label: "Level", description: "Configure levels", value: ConfigurationSelectMenuMain.level},
                            ])
                    ]
                })
            ]
        } as MessageOptions
    }
    static async welcome_message(interaction: SelectMenuInteraction | ButtonInteraction): Promise<MessageOptions> {
        let channels = interaction.guild?.channels.cache.filter(c=>c.isText()).map(c=>({label: c.name.substring(0,50), value: c.id}))!;
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: interaction.guild!.id } } });
        let options = [];
        for (let i = 0; i < channels.length; i += 24) {
            options.push(
                new MessageActionRow().addComponents(
                    [
                        new MessageSelectMenu().setCustomId(ConfigurationSelects.welcome_message_id_config_select + "#"+(i/24)).setPlaceholder("Choose in what channel welcome will be sent...")
                            .addOptions([
                                {label: "None", description: "Use this to disable feature", value: "none"},
                                ...channels.slice(i, i + 24)
                            ]),
                    ]
                ),
            );
        }
        return {
            content: "**Welcome configuration.**\nYou can configure welcome message in this section\n__Warning! multiple channel selects can appear, use only one of these selects__\n\nEmbed preview:",
            embeds:[
                new MessageEmbed()
                .setTitle(conf!.welcome_title)
                .setDescription(conf!.welcome_message.replaceAll("{user}", interaction.member!.toString()).replaceAll("{user_number}", interaction.guild!.memberCount.toString()).replaceAll("{user_list}", `\n - ${interaction.member!}`))
                .setImage((interaction.member! as GuildMember).avatarURL() || "")
                .setColor(`#${conf!.welcome_color}`)
            ],
            components: [
                ...options,
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId(ConfigurationButtons.welcome_message_title_config_button)
                        .setLabel("Configure title")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.welcome_message_text_config_button)
                        .setLabel("Configure description")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.welcome_message_color_config_button)
                        .setLabel("Configure color")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.return_to_main_menu_config_button)
                        .setLabel("Return to main menu")
                        .setStyle("DANGER")   

                ])
            ]
        } as MessageOptions
    }


    static async goodbye_message(interaction: SelectMenuInteraction | ButtonInteraction): Promise<MessageOptions> {
        let channels = interaction.guild?.channels.cache.filter(c=>c.isText()).map(c=>({label: c.name.substring(0,50), value: c.id}))!;
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: interaction.guild!.id } } });
        let options = [];
        for (let i = 0; i < channels.length; i += 24) {
            options.push(
                new MessageActionRow().addComponents(
                    [
                        new MessageSelectMenu().setCustomId(ConfigurationSelects.goodbye_message_id_config_select + "#"+(i/24)).setPlaceholder("Choose in what channel goodbye will be sent...")
                            .addOptions([
                                {label: "None", description: "Use this to disable feature", value: "none"},
                                ...channels.slice(i, i + 24)
                            ]),
                    ]
                ),
            );
        }
        return {
            content: "**Goodbye configuration.**\nYou can configure goodbye message in this section\n__Warning! multiple channel selects can appear, use only one of these selects__\n\nEmbed preview:",
            embeds:[
                new MessageEmbed()
                .setTitle(conf!.goodbye_title)
                .setDescription(conf!.goodbye_message.replaceAll("{user}", interaction.member!.toString()).replaceAll("{user_number}", interaction.guild!.memberCount.toString()).replaceAll("{user_list}", `\n - ${interaction.member!}`))
                .setImage((interaction.member! as GuildMember).avatarURL() || "")
                .setColor(`#${conf!.goodbye_color}`)
            ],
            components: [
                ...options,
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId(ConfigurationButtons.goodbye_message_title_config_button)
                        .setLabel("Configure title")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.goodbye_message_text_config_button)
                        .setLabel("Configure description")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.goodbye_message_color_config_button)
                        .setLabel("Configure color")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.return_to_main_menu_config_button)
                        .setLabel("Return to main menu")
                        .setStyle("DANGER")   


                ])
            ]
        } as MessageOptions
    }

    static async boost_message(interaction: SelectMenuInteraction | ButtonInteraction): Promise<MessageOptions> {
        let channels = interaction.guild?.channels.cache.filter(c=>c.isText()).map(c=>({label: c.name.substring(0,50), value: c.id}))!;
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: interaction.guild!.id } } });
        let options = [];
        for (let i = 0; i < channels.length; i += 24) {
            options.push(
                new MessageActionRow().addComponents(
                    [
                        new MessageSelectMenu().setCustomId(ConfigurationSelects.boost_message_id_config_select + "#"+(i/24)).setPlaceholder("Choose in what channel boost will be sent...")
                            .addOptions([
                                {label: "None", description: "Use this to disable feature", value: "none"},
                                ...channels.slice(i, i + 24)
                            ]),
                    ]
                ),
            );
        }
        return {
            content: "**boost configuration.**\nYou can configure boost message in this section\n__Warning! multiple channel selects can appear, use only one of these selects__\n\nEmbed preview:",
            embeds:[
                new MessageEmbed()
                .setTitle(conf!.boost_title)
                .setDescription(conf!.boost_message.replaceAll("{user}", interaction.member!.toString()).replaceAll("{boost_number}", `${interaction.guild!.premiumSubscriptionCount}`).replaceAll("{user_list}", `\n - ${interaction.member!}`))
                .setImage((interaction.member! as GuildMember).avatarURL() || "")
                .setColor(`#${conf!.boost_color}`)
            ],
            components: [
                ...options,
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId(ConfigurationButtons.boost_message_title_config_button)
                        .setLabel("Configure title")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.boost_message_text_config_button)
                        .setLabel("Configure description")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.boost_message_color_config_button)
                        .setLabel("Configure color")
                        .setStyle("PRIMARY"),
                    new MessageButton().setCustomId(ConfigurationButtons.return_to_main_menu_config_button)
                        .setLabel("Return to main menu")
                        .setStyle("DANGER")   


                ])
            ]
        } as MessageOptions
    }
}