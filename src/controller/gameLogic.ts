import { Character, Character as rol } from "../model/characterModel";
import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";
import { Mission, MissionType as type } from "../model/missionModel";
import { battle,giveReward } from "./helpers";
const readline = require("readline-sync");
let charactersList: rol[] = [];
const mageList: Mage[] = [];
const warriorList: Warrior[] = [];

export function createCharacter(
    name: string,
    level: number,
    health: number ,
    experience: number = 0,
    inventory: string[] = []
): rol | void {
    let index = charactersList.findIndex(character => character.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (index !== -1) { console.log(`Personaje con el nombre ${name} ya existe.`); return; }
    let item = parseInt(readline.question("¿Quieres que el personaje sea? \n 1- General\n 2- Warrior\n 3- Mage\n"));
    let character: Character;
    switch (item) {
        case 1:
            const newCharacter = new rol(name, level, health, experience, inventory);
            newCharacter.name = name;
            newCharacter.level = level;
            newCharacter.health = health;
            character = new Character(name, level, health, experience, inventory); break;
        case 2:
            let attackCalled = parseInt(readline.question("¿Qué nivel de ataque tiene tu personaje?"));
            attackCalled = validation(attackCalled)
            let defenseCalled = parseInt(readline.question("¿Qué nivel de defensa tiene tu personaje?"));
            defenseCalled = validation(defenseCalled)
            const NewWarrior = new Warrior(name, level, health, experience, inventory, attackCalled, defenseCalled)
            NewWarrior.attack = attackCalled;
            NewWarrior.defense = defenseCalled
            charactersList.push(NewWarrior);
            warriorList.push(NewWarrior);
            return NewWarrior;
        case 3:
            let manaCalled = parseInt(readline.question("¿Cuánto mana tiene tu personaje?"));
            manaCalled = validation(manaCalled)
            const NewMage = new Mage(name, level, health, experience, [], inventory, manaCalled);
            charactersList.push(NewMage);
            mageList.push(NewMage);
            NewMage.mana = manaCalled;
            return NewMage;
        default:
            let error = console.log("Error");
            return error;
    }
    charactersList.push(character);
    return character;

}

function validation(value: number) {
    while (value <= 0 || isNaN(value)) {
        console.log("El valor no puede ser 0 o estas usando letras, por favor ingresa un valor mayor.");
        value = parseInt(readline.question("¿Cuál sería el valor del personaje? "));
    }
    return value;
}
export function listCharacters(): void {
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


export function updateCharacter(name: string, update: Character): void {
    let index = charactersList.findIndex(character =>
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    console.log(`Buscando personaje: ${name}, Índice encontrado: ${index}`); 
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


export function deleteCharacter(name: string): Character | void {
    let indexOf = charactersList.findIndex(character =>
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    let warriorIndex = warriorList.findIndex(character =>
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (warriorIndex !== -1) {
        warriorList.splice(warriorIndex, 1);
    }
    let magoIndex = mageList.findIndex(character =>
        character.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (magoIndex !== -1) {
        mageList.splice(magoIndex, 1);
    }

    if (indexOf !== -1) {
        let aprove = readline.question(`¿Estás seguro de eliminar ⚠️ ${name} de la lista 📝?\n 1.Sí\n 2.No \n`);

        if (parseInt(aprove) === 1) {
            charactersList.splice(indexOf, 1);
            
            console.log(`El personaje ${name} ha sido eliminado correctamente.`);
        } else {
            console.log("No se ha eliminado, sigue en la lista.");
        }
    } else {
        console.log(`Personaje con el nombre ${name} no encontrado.❌`);
    }
}

export function assignMission(name: string, missionType: type): void {
    let foudName = charactersList.find(names => names.name.toLowerCase() === name.toLowerCase());
    if (foudName) {
        if (Object.values(type).includes(missionType)) {
            let newMission = new Mission("", missionType, 0, 0);
            newMission.getMissionAleator();
            while (foudName.missions.some(mission => mission.description === newMission.description)) {
                newMission.getMissionAleator();
            }
            foudName.missions.push(newMission)
            console.log(`${foudName.name} se te otorgo la misión: ${newMission.description} 🧩`);
        } else {
            console.log("Tipo de misión no válido.🚨");
        }
    } else {
        console.log("No se encontró el personaje con el nombre proporcionado.🚨");
    }
}

function completeMissionGeneral(name: string,id:number) {
    let foudName = charactersList.find(names => names.name.toLowerCase() === name.toLowerCase());    
    if (foudName) {
        let mission = foudName.missions[id - 1]; 
        if (mission) {
            mission.getAleatoryWin(foudName);
        }else {
            console.log(`No se encontró la misión con el item: ${id}.`);
        }

    }else{
        console.log("No se encontró el personaje con el nombre proporcionado.🚨");
    };
}

export function completeMission(name: string, id: number) {
    let foudName = charactersList.find(names => names.name.toLowerCase() === name.toLowerCase());
    if (foudName) {
        let mission = foudName.missions[id - 1];
        if (mission) {
            let enemy: Warrior | Mage | undefined;
            if (mageList.length === 0 || warriorList.length === 0) {
                console.log("No hay contrincantes disponibles. Avanzando a completar la misión.");
                completeMissionGeneral(foudName.name, id);  // Completar misión sin pelea
                return; 
            }
            if (foudName instanceof Warrior) {
                enemy = mageList[Math.floor(Math.random() * mageList.length)];
                console.log(`Se encontró con un mago llamada ${enemy.name}, trata de derrotarlo`);
            } 
            else if (foudName instanceof Mage) {
                enemy = warriorList[Math.floor(Math.random() * warriorList.length)];
                console.log(`Se encontró con un warrior llamado ${enemy.name}, trata de derrotarlo`);
            }
            mission.getAleatoryWin(foudName);
        } else {
            console.log(`No se encontró la misión con el item: ${id}.`);
        }
    } else {
        console.log("No se encontró el personaje con el nombre proporcionado.🚨");
    }
}
export function showMissions(name: string): void {
    let foudName = charactersList.find(names => names.name.toLowerCase() === name.toLowerCase());
    if (foudName) {
        console.log(`El ${foudName.name} tiene ${foudName.missions.length} misión(es) la(s) cual(es) son:`);
        foudName.missions.forEach((mission, index) => {
            console.log(`${index + 1}: ${mission.description}`);
        });
    } else {
        console.log("No se encontró el personaje con el nombre proporcionado.🚨");
    }
}

export async function batle(name: string) {
    const foundCharacter = charactersList.find(character => character.name.toLowerCase() === name.toLowerCase());
  
    if (foundCharacter) {
      let enemy: Warrior | Mage;
      if (mageList.length === 0 || mageList.length === 0) {
        console.log('No hay enemigo disponibles para luchar contra ti.');
        return; 
      }
      if (foundCharacter instanceof Warrior) {
        enemy = mageList[Math.floor(Math.random() * mageList.length)];
        console.log(`${foundCharacter.name} es un Guerrero. El enemigo es un Mago: ${enemy.name}`);
      } else if (foundCharacter instanceof Mage) {
        enemy = warriorList[Math.floor(Math.random() * warriorList.length)];
        console.log(`${foundCharacter.name} es un Mago. El enemigo se un Guerrero: ${enemy.name}`);
      } else {
        console.log('El personaje no es válido');
        return;
      }
        await battle(foundCharacter as Warrior | Mage, enemy);
    } else {
      console.log('El personaje no fue encontrado en la lista.');
    }
  }
