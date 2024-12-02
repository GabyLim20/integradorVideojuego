import { Character as rol } from "./characterModel";
import { Warrior } from "./warriorModel";
import { Mage } from "./mageModel";
export enum MissionType {
    Main = "Main",
    Side = "Side",
    Event = "Event"
}

export class Mission {
    private _description: string;
    private _difficulty: number;
    private _reward: number;
    private _type: MissionType;

    constructor(description:string,type: MissionType,difficulty: number,reward:number){
        this._description = description;
        this._type = type;
        this._difficulty = difficulty;
        this._reward = reward;
    }
    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
    get difficulty(): number {
        return this._difficulty;
    }

    set difficulty(value: number) {
        if (value < 1) {
            console.log("La dificultad mínima es 1");
        } else if (value > 10) {
            console.log("La dificultad máxima es 10");
        } else {
            this._difficulty = value;
        }
    }
    get reward(): number {
        return this._reward;
    }

    set reward(value: number) {
        if (value < 0) {
            console.log("La recompensa no puede ser negativa");
        } else {
            this._reward = value;
        }
    }
    getMissionAleator():void{
        const descriptions: string[] = [
            "Encuentra a la reina",
            "Busca y recupera el anillo poderoso",
            "Recupera el artefacto perdido"

        ]
        const descriptionsSide: string[] = [
            "Repara el puente de la aldea",
            "Investigar antiguas ruinas para descubrir los tesoros ocultos",
            "Recolecta suministros para el aldea",
            
        ]
        const descriptionsEvent: string[] = [
            "Encuentra los huevos de pascua",
            "Recoge frutas mágicas durante la luna llena",
            "Construye un altar en el Festival de la Cosecha",
            "Búsqueda de reliquias para el Día de los Muertos"
        ]
        let value:string = "";
        let  difficult:number = Math.floor(Math.random() * 3) + 1;
        
        if (this._type === MissionType.Main) {
            value = descriptions[Math.floor(Math.random() * descriptions.length)];
            this.reward = 3;
        } else if (this._type === MissionType.Side) {
            value = descriptionsSide[Math.floor(Math.random() * descriptionsSide.length)];
            this.reward = 2;
        } else if (this._type === MissionType.Event) {
            value = descriptionsEvent[Math.floor(Math.random() * descriptionsEvent.length)];
            this.reward = 1;
        } else {
            throw Error("Tipo de misión no válido.");
        }
        this.difficulty = difficult
        if (difficult === 1) {
            console.log(`Misión fácil asignada al evento ${this.type}`);
        } else if (difficult === 2) {
            console.log(`Misión de dificultad media asignada al evento ${this.type}`);
        } else {
            console.log(`Misión difícil asignada al evento ${this.type}`);
        }
        this.description = value;
    }
    getExperienceReward(): number {
        switch (this.type) {
            case MissionType.Main:
                return this.reward * 2 * this.difficulty;  

            case MissionType.Side:
                return this.reward * this.difficulty;  
            case MissionType.Event:
                return this.reward * 4 * this.difficulty;  
            default:
                return 0;
        }
    }
    
    getAleatoryWin(rol: rol| Warrior | Mage):void{
        let succes:number;
        if (this.difficulty === 2) {
            succes = 0.4; 
        } else if (this.difficulty === 3) {
            succes = 0.6; 
        } else {
            succes = 0.2;
        }
        let random= Math.random();

        if (random <= succes) {
            rol.win(this)
            
        } else {
            rol.lose(this)  
        }
    }
    get type(): MissionType {
        return this._type;
    }
    
    set type(value: MissionType){
        this._type = value
    }

}
