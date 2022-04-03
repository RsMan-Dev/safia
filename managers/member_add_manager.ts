import { GuildMember } from "discord.js";
import Welcome from "../actions/welcome";

export default class MemberAddManager{
    private constructor(){}
    static dispatch(member: GuildMember): void{
        Welcome.sendWelcomeMessage(member);
    }
}