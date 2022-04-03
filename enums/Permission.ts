import { Permissions as Perms, PermissionString } from "discord.js"

export type PermissionValue = {name: string, discord_name: bigint }

export default class Permissions{
    private constructor(){}
    static get auto_giveable() : PermissionValue    { return { name: "auto_giveable", discord_name: BigInt(0) }};
    static get ban()           : PermissionValue    { return { name: "auto_giveable", discord_name: Perms.FLAGS.BAN_MEMBERS }};
    static get mute()          : PermissionValue    { return { name: "auto_giveable", discord_name: Perms.FLAGS.MUTE_MEMBERS }};
    static get kick()          : PermissionValue    { return { name: "auto_giveable", discord_name: Perms.FLAGS.KICK_MEMBERS }};
    static get config()        : PermissionValue    { return { name: "auto_giveable", discord_name: Perms.FLAGS.ADMINISTRATOR }};
}
/*
        {name: "auto_giveable", label: "auto_giveable"},
        {name: "ban", label: "ban"},
        {name: "mute", label: "mute"},
        {name: "kick", label: "kick"},
        {name: "config", label: "config"},
*/