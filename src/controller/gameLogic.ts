import { Character as rol } from "../model/characterModel";
import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";
const prompt = require("prompt-sync")({ sigint: true });
const readlineSync = require("readline-sync");
/*Crea la función createCharacter en un archivo (por ejemplo, gameLogic.ts) que reciba
parámetros como name, level y health para crear un nuevo personaje. */
function createCharacter(
    name: string, 
    level: number, 
    health: number, 
    experience: number = 0, 
    inventory: string[] = [] 
): rol | undefined{
    //console.log("¿Que personaje deseas agregar");
    let options = ["General", "Warrior ", "Mage "];
    console.log("Nombre,nivel,salud e inventatio" );

    let index = readlineSync.keyInSelect(options, '¿Qué personaje deseas agregar?');
    switch (index) {
        case 0:
            return new rol(name, level, health, experience, inventory);
        case 1:
            const attackCalled = parseInt(prompt("¿Qué nivel de ataque tiene tu personaje?") || "0");
            const defenseCalled = parseInt(prompt("¿Qué nivel de defensa tiene tu personaje?") || "0");
            return new Warrior (name, level, health,experience,inventory,attackCalled, defenseCalled)
        case 2: 
        const magicPower = prompt("¿Qué tipo de poder mágico tiene tu personaje?") || "Fuego";
        const manaCalled = parseInt(prompt("¿Cuánto mana tiene tu personaje?") || "100");
        return new Mage(name, level, health, experience,inventory,magicPower,manaCalled); 
        default:
            console.log("Error");
            return undefined;
    }
}