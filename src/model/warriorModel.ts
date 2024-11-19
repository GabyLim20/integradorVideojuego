import { Character as rol} from "./characterModel";
export class Warrior extends rol{
    private _attack: number;  
    private _defense: number;
    constructor(name: string, level: number, health: number, experience: number, attack: number,defense:number) {
        super(name, level, health, experience); 
        this._attack = attack;
        this._defense = defense
    }
    public get attack(): number {
        return this._attack
    }

    public get defense(): number {
        return this._defense
    }
    public set attack(value: number){
        if (value <=0) {
            console.log("Error no puedes atacar menor a 0 🤺");
        } else{
            this._attack = value;
        }
    }
    public set defense(value: number){
        if (value <=0) {
            console.log("La defensa no puede ser negativa ⚔️");        
        } else{
            this._attack = value;
        }
    }
    public getDetails(): string {
        return `${super.getDetails()}, Attack: ${this._attack}, Defense: ${this._defense}`;
    }
    public completeMission(missionType: string): void {
        console.log(`${this.name} ha completado una misión de tipo ${missionType}`);
    }

}