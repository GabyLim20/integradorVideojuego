import { Mission } from './missionModel'; 

export class Character {
    private _name: string;
    private _level: number;
    private _health: number;
    private _experience: number;
    private _inventory: string[];
    
    

    constructor(name: string, level: number, health: number, experience: number,inventory:string[] = []) {
        this._name = name;
        this._level = level;
        this._health = health;
        this._experience = experience;
        this._inventory = inventory
    }

    public get name(): string {
        return this._name
    }
    
    public set name(value: string) {
        this._name = value;
    }
    public get level(): number {
        return this._level
    }
   set level(value: number){
    if (value <= 0) {
        console.log("Estas en el nivel 0 ");
    } else {
        this._level = value;
    }
   }

    public get health(): number {
        if (this._health < 50) {
            console.log("Alerta: tu salud está por debajo del 50%");
        } else if (this._health <= 0) {
            console.log("¡Estás muerto!");
        }
        return this._health;
    }
    set health(value: number) {
        if (value < 0) {
            console.log("¡No puedes tener una salud negativa! ☠️  ");

        } else if(value <50){
            console.log("Te queda menos del 50% de tu vida🪫");
        }else {
            console.log("Tienes más del 50% de vida 🔋");
            this._health = value;
        }
    }

    public get experience(): number {
        return this._experience
    }

    public get inventory(): string[] {
        return this._inventory;
    }
    public set inventory(value: string[]) {
        this._inventory = value;
    }
    
    addInventory(item: string): void {
        this._inventory.push(item);
    }
    public set experience(value: number) {
        if (value >= 0) {
            this._experience = value;
        } else {
            console.log("La experiencia no puede ser negativa.");
        }
    }
    
    win(mission: Mission): void {
        const winExperience = mission.getExperienceReward();  
        this._experience += winExperience;
        console.log(`${this.name} bien hecho has completado con exito: "${mission.description}" y has ganado ${winExperience} puntos de experiencia.`);
    }
    

}
