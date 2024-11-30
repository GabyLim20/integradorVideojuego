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
        let descriptions: string[] = [
            "Encuentra a la reina",
            "Busca y recupera el anillo poderoso",
            "Protege al pueblo",
            "Recupera el artefacto perdido"

        ]
        let descriptionsSide: string[] = [
            "Repara el puente de la aldea",
            "Investigar antiguas ruinas para descubrir los tesoros ocultos",
            "Recolecta suministros para el aldea",
            "Captura a el bandido buscado"
            
        ]
        let descriptionsEvent: string[] = [
            "Encuentra los huevos de pascua",
            "Recoge frutas mágicas durante la luna llena",
            "Construye un altar en el Festival de la Cosecha",
            "Búsqueda de reliquias para el Día de los Muertos"
        ]
        let value:string = "";
        let  difficult:number = Math.floor(Math.random() * 8) + 1;
        
        if (this._type === MissionType.Main) {
            value = descriptions[Math.floor(Math.random() * descriptions.length)];
            this.reward = 3;
        }else if (this._type === MissionType.Side) {
            value = descriptions[Math.floor(Math.random() * descriptionsSide.length)];
            this.reward = 2;
        }else if(this._type === MissionType.Event) {
            value = descriptions[Math.floor(Math.random() * descriptionsEvent.length)];
            this.reward = 1;
        }else {
            throw  Error("Tipo de misión no válido.");
        }
        if (this._difficulty <= 3) {
            console.log(`Misión fácil asignada al evento ${this.type}`);
        } else if (this._difficulty <= 6) {
            console.log(`Misión de dificultad media asignada al evento ${this.type}`);
        } else {
            console.log(`Misión difícil asignada al evento ${this.type}`);
        }

        this.description = value;
        this.difficulty = difficult;

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
    get type(): MissionType {
        return this._type;
    }
    
    set type(value: MissionType){
        this._type = value
    }

}
