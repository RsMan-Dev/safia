import { SelectMenuInteraction } from "discord.js";
import AutoRole from "../actions/autorole";

export default class SelectmenuManager{
    private constructor(){}
    static dispatch(interaction: SelectMenuInteraction){
        switch(interaction.customId){

            case "selectRole": AutoRole.menuRole(interaction); return;

        }
    }
}