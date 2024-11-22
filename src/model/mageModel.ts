import { Character as rol} from "./characterModel";
export class Mage extends rol{
    private _magic: string[];;
    private _mana: number
    constructor(name: string, level: number, health: number, experience: number,inventory:string[] = [],magic:string[] = [],mana: number) {
        super(name, level, health, experience,inventory); 
        this._magic = magic;
        this._mana = mana
    }
    public get magic():string[] {
        return this._magic
    }
    addMagic(item: string): void {
        this._magic.push(item);
    }
    public get mana():number{
        return this._mana
    }
    public set mana(value: number) {
        if (value < 0) {
            console.log("Ya no tienes energía 🪫 ");
        } else if(value <50){
            console.log("Te queda menos del 50% de tu energía 🚨");
        }else {
            console.log("Tienes más del 50% de energía 🔋");
            this._mana = value;
        }
    }
    public rechargeMana(amount: number): void {
        this._mana += amount;
        console.log(`${this.name} ha recargado ${amount} maná. Maná actual: ${this._mana}`);
    }
    public spendMagic():void{
        if (this._mana > 0) {
            console.log(`${this.name} ha lanzado un hechizo con ${this._magic} de poder mágico.`);
            this._mana -= 10; 
            if (this._mana < 0) this._mana = 0; 
        } else {
            console.log(`${this.name} no tiene maná suficiente para lanzar un hechizo.`);
        }
    }
    public completeMission(missionType: string): void {
        console.log(`${this.name} ha completado una misión de tipo ${missionType}`);
    }
}