import { read } from "fs";
import { Character, Character as rol } from "../model/characterModel";
import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";
const readline = require("readline-sync");
/*Crea la función createCharacter en un archivo (por ejemplo, gameLogic.ts) que reciba
parámetros como name, level y health para crear un nuevo personaje. */
let charactersList: rol[] = [];

function createCharacter(
    name: string,
    level: number,
    health: number,
    experience: number = 0,
    inventory: string[] = []
): rol | void  {
    let index = parseInt(readline.question("¿Quieres que el personaje sea? \n 1- General\n 2- Warrior\n 3- Mage\n"));
    switch (index) {
        
        case 1:
            const newCharacter = new rol(name, level, health, experience, inventory);
            while (health <= 0) {
                console.log("La salud no puede ser 0, por favor ingresa un valor mayor.");
                health = parseInt(readline.question("¿Cuál es la salud del personaj? "));
            }
            newCharacter.name = name;
            newCharacter.level = level;
            newCharacter.health = health;
            charactersList.push(newCharacter);
            return newCharacter;
        case 2:
            const attackCalled = parseInt(readline.question("¿Qué nivel de ataque tiene tu personaje?") || "0");
            const defenseCalled = parseInt(readline.question("¿Qué nivel de defensa tiene tu personaje?") || "0");
            const NewWarrior = new Warrior(name, level, health, experience, inventory, attackCalled, defenseCalled)
            NewWarrior.attack = attackCalled;
            NewWarrior.defense = defenseCalled
            charactersList.push(NewWarrior);
            return NewWarrior;
        case 3:
            const items = readline.question("¿Cuál es el inventario? (separados por coma) ") || "Fuego";
            const magicPower: string[] = items.split(",").map((item: string) => item.trim());

            const manaCalled = parseInt(readline.question("¿Cuánto mana tiene tu personaje?") || "100");
            const NewMage = new Mage(name, level, health, experience, inventory, magicPower, manaCalled);
            charactersList.push(NewMage);
            NewMage.mana = manaCalled;
            return NewMage;
        default:
            let error = console.log("Error");
            return error;
    }
    
}

function listCharacters():void {
    if (charactersList.length === 0) {
        console.log("No hay personajes creados.");
        return;
    }

    console.log("Lista de personajes:");
    charactersList.forEach((character, index) => {
        console.log(`\nPersonaje ${index + 1}:`);
        console.log(`Nombre: ${character.name}`);
        console.log(`Nivel📈💪: ${character.level}`);
        console.log(`Salud🩺: ${character.health}`);
        console.log(`Experiencia🎖️: ${character.experience}`);
        console.log(`Inventario🏷️📌: ${character.inventory.join(', ')}`);
        if (character instanceof Warrior) {
            console.log(`Ataque⚔️: ${character.attack}`);
            console.log(`Defensa🥊: ${character.defense}`);
        }
        if (character instanceof Mage) {
            console.log(`Magia🔮: ${character.magic}`);
            console.log(`Mana🪄: ${character.mana}`);
        }
        console.log('------------------------');
    });
    
}

function updateCharacter(name:string, update: Character):void {
    let index = charactersList.findIndex(character => 
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (index !== -1) {
        let character = charactersList[index];
        if (update.name) character.name = update.name;
        if (update.level) character.level = update.level;
        if (update.health) character.health = update.health;
        if (update.inventory) character.inventory = update.inventory;
            console.log(`Personaje ${name} actualizado correctamente.`);
    } else {
        console.log(`Personaje con el nombre ${name} no encontrado.`);
    }  
}



function deleteCharacter(name: string): Character | void {
    let indexOf = charactersList.findIndex(character => 
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    
    if (indexOf !== -1) {
        let aprove = readline.question(`¿Estás seguro de eliminar ⚠️ ${name} de la lista 📝?\n 1.Sí\n 2.No \n`);
        
        if (parseInt(aprove) === 1) {
            charactersList.splice(indexOf, 1);
            console.log(`El personaje ${name} ha sido eliminado correctamente.`);
        } else {
            console.log("No se ha eliminado, sigue en la lista.");
        }
    } else {
        console.log(`Personaje con el nombre ${name} no encontrado.`);
    }      
}


function showMenu():any {
    let option: string;
    do {
        console.log("\n--- Menú ---");
        console.log("1. Crear personaje");
        console.log("2. Listar personajes");
        console.log("3. Actualizar personaje");
        console.log("4. Eliminar personaje");
        console.log("5. Salir");

        option = readline.question("Elige una opción: ");

        switch (option) {
            case "1":
                let name = readline.question("¿Cuál es el nombre? ");
                let level = parseInt(readline.question("¿Cuál es el nivel? "));
                let health = parseFloat(readline.question("¿Cuál es el nivel de vida? "));
                
                const items = readline.question("¿Cuál es el inventario? (separados por coma) ");
                const inventory = items ? items.split(",").map((item: string) => item.trim()) : [];
                createCharacter(name, level, health, 0, inventory);
                break;
            case "2":
                listCharacters();
                break;
            case "3":
                let searchByName = readline.question("¿Cuál es el nombre del personaje ha buscar? ");
                let updatedCharacter = createCharacter(
                    searchByName, 
                    parseInt(readline.question("Nuevo nivel: ")),  
                    parseInt(readline.question("Nueva salud: ")), 
                    parseInt(readline.question("Nueva experiencia: ")), 
                    []  
                );
                if (updatedCharacter) {
                    updateCharacter(searchByName, updatedCharacter);
                } else {
                    console.log("Error al crear el personaje. No se pudo actualizar.");
                }
                break;
            case "4":
                let deleteByName = readline.question("¿Cuál es el nombre del personaje ha eliminar? ");
                deleteCharacter(deleteByName);
                break;
            case "5":
                console.log("Saliendo...");
                break;
            default:
                console.log("Opción no válida, por favor elige nuevamente.");
        }
    } while (option !== "5");
}
showMenu();


