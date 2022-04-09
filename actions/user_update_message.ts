import { configurations } from "@prisma/client";
import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Message, PartialGuildMember, MessagePayload, MessageOptions, MessageMentions, User, Guild } from "discord.js";
import Logger from "../utils/logger";
import prisma_instance from "../utils/prisma_instance";

export enum UserUpdateMessageType{
    welcome = "welcome",
    goodbye = "goodbye",
    boost = "boost"
}
export enum UserUpdateMessageButtons{
    welcome = "say_welcome",
    goodbye = "say_goodbye",
}
const USER_LIST_MATCH = / - (<@!?(\d{17,19})>)\n/g;
const USER_MATCH = MessageMentions.USERS_PATTERN;
export default class UserUpdateMessage {
    private constructor(){}

    static async getUpdateMessageObject(guild: Guild, member: GuildMember | User, member_list: (string | GuildMember)[], type: UserUpdateMessageType, withConf?: configurations) : Promise<[string | undefined, MessagePayload | MessageOptions | undefined]> {
        let conf = withConf || await prisma_instance.configurations.findFirst({where: { guild: { id: guild.id } } });
        if(conf == null) return [undefined, undefined];
        return [
            conf[`${type}_channel_id`] || undefined,
            {
                embeds:[
                    new MessageEmbed()
                        .setTitle(conf[`${type}_title`]!)
                        .setDescription(conf[`${type}_message`]!.replaceAll("{user}", member.toString()).replaceAll("{user_number}", guild.memberCount.toString()).replaceAll("{boost_number}", (guild.premiumSubscriptionCount || 0).toString()).replaceAll("{user_list}", "\n" + member_list.map(m=>' - ' + m.toString() + '\n').join("")))
                        .setThumbnail(member.displayAvatarURL() || "")
                        .setColor(`#${conf[`${type}_color`]!}`)
                ],
                components:[
                    new MessageActionRow({
                        components: type != UserUpdateMessageType.boost ?
                            [
                                new MessageButton()
                                    .setLabel(`Say ${type}`)
                                    .setCustomId(UserUpdateMessageButtons[type])
                                    .setStyle("PRIMARY")
                            ]
                            : []
                    })
                ]
            }
        ];
    }

    static async sendUpdateMessage(member: GuildMember, type: UserUpdateMessageType) {
        let [channel_id, message] = await this.getUpdateMessageObject(member.guild, member, [], type);
        if(!message || !channel_id) return;
        (member.guild.channels.cache.get(channel_id) as TextChannel)
            ?.send(message);
    }

    static async updateMessageButtonInteract(interaction: ButtonInteraction, type: UserUpdateMessageType) {
        if(!interaction.guild || !interaction.member) return;
        let message = interaction.message as Message;
        let embed = message.embeds[0];
        let embedDescription = embed?.description;
        if(!embedDescription) return;
        let member_list = [...embedDescription.matchAll(USER_LIST_MATCH) || []].map(m=>m[1]);
        let member = [...embedDescription.matchAll(USER_MATCH) || []].find(m=>!member_list.includes(m[0])) || "";
        if(member == "") return;
        let memberObject = await interaction.client.users.fetch(member[1]);
        if(member_list.find(m=>m == (interaction.member as GuildMember).toString())){
            interaction.reply({content: `You have already said ${type}` , ephemeral: true});
        } else if (member[0] == interaction.member.toString()){
            interaction.reply({content: `Sorry, you cannot say ${type} to yourself` , ephemeral: true});
        } else if (member_list.length > 10){
            interaction.reply({content: `Sorry, we are too much who says ${type}` , ephemeral: true});
        } else {
            member_list.push((interaction.member as GuildMember).toString());
            let [_, messageUpdate] = await this.getUpdateMessageObject(interaction.guild, memberObject, member_list, type);
            if(messageUpdate) interaction.update(messageUpdate);
        }
    }
}
