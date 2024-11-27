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
            "Ve a "
        ]
        const i = Math.floor(Math.random() * descriptions.length);
        this.description = descriptions[i];
        if (this.difficulty <= 3){
            return
            
        }

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