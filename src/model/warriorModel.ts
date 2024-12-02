import { Character as rol} from "./characterModel";
import { Mage } from "./mageModel";
import { Mission } from './missionModel'; 

export class Warrior extends rol{
    private _attack: number;  
    private _defense: number;
    constructor(name: string, level: number, health: number, experience: number,inventory:string[] = [], attack: number,defense:number) {
        super(name, level, health, experience,inventory); 
        this._attack = attack;
        this._defense = defense;

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
    takeDamage(damage: number): void {
        this.health -= damage;
        console.log(`${this.name} recibió ${damage} puntos de daño. Salud restante: ${this.health}`);
    }
    attackEnemy(enemy: Mage): void {
        let damage = this.attack - enemy.mana;
        damage = damage > 0 ? damage : 0; 
        enemy.takeDamage(damage);
        console.log(`${this.name} ataca a ${enemy.name} y le causa ${damage} puntos de daño.`);
    }


}