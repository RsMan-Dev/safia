import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Message, PartialGuildMember, MessagePayload, MessageOptions, CommandInteraction } from "discord.js";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";

export default class Logs {
    private constructor() {}

    static async clearlogs(interaction: CommandInteraction){
        let conf = await prisma_instance.configurations.findFirst({where: { guild: { id: interaction.guild!.id } } });

    }
}