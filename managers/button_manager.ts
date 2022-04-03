import { ButtonInteraction } from "discord.js";
import Ping from "../actions/ping";
import Welcome from "../actions/welcome";

export default class ButtonManger{
    private constructor(){}
    static dispatch(interaction: ButtonInteraction){
        switch(interaction.customId){
            case "ping": Ping.trigger(interaction); return;
            case "sayWelcome": Welcome.sayWelcome(interaction); return;
        }
    }
}