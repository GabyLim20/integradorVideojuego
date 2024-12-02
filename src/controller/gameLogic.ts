import { Character, Character as rol } from "../model/characterModel";
import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";
import { Mission, MissionType as type } from "../model/missionModel";
const readline = require("readline-sync");
const charactersList: rol[] = [];
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
            warriorList.push(NewWarrior)
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
    if (index !== -1) {
        let character = charactersList[index];
        if (update.name) character.name = update.name;
        if (update.level) character.level = update.level;
        if (update.health) character.health = update.health;
        if (update.inventory) character.inventory = update.inventory;
        console.log(`Personaje ${name} actualizado correctamente.`);
    } else {
        console.log(`Personaje con el nombre ${name} no encontrado.❌`);
    }
}

export function deleteCharacter(name: string): Character | void {
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

function completeMissions(name: string,id:number) {
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
            if (foudName instanceof Warrior) {
                enemy = new Mage("Mesias", 1, 100, 0, [], ["Fuego"], 100);
            } else if (foudName instanceof Mage) {
                enemy = new Warrior("Mesias", 1, 100, 0, [], 100, 100);
            } 
            if (enemy) {
                mission.getAleatoryWin(foudName);
            } else {
                completeMissions(foudName.name,id)
            }
        } else {
            console.log(`No se encontró la misión con el item: ${id}.`);
        }
    } else {
        console.log("No se encontró el personaje con el nombre proporcionado.🚨");
    }
}
export function completeMission2(name: string, id: number) {
    let foudName = charactersList.find(names => names.name.toLowerCase() === name.toLowerCase());
    
    if (foudName) {
        let mission = foudName.missions[id - 1];
        if (mission) {
            let enemy: Warrior | Mage | undefined;
            /*if (mageList.length === 0 || warriorList.length === 0) {
                console.log("No hay contrincantes disponibles. Avanzando a completar la misión.");
                completeMissions(foudName.name, id); 
                return; 
            }*/
            if (foudName instanceof Warrior) {
                enemy = mageList[Math.floor(Math.random() * mageList.length)];
            } 
            else if (foudName instanceof Mage) {
                enemy = warriorList[Math.floor(Math.random() * warriorList.length)];
            }
            if (enemy) {
                mission.getAleatoryWin(foudName);
            } else {
                console.log("No hay contrincantes disponibles. Avanzando a completar la misión.");
                completeMissions(foudName.name, id); 
            }
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

async function battle(character: Warrior | Mage, enemy: Warrior | Mage): Promise<void> {
    try {
      if (character.health <= 0) {
        console.log(`${character.name} no tiene vida suficiente para pelear. Terminando la batalla.`);
        return;
      }
      if (enemy.health <= 0) {
        console.log(`${enemy.name} no tiene vida suficiente para pelear. Terminando la batalla.`);
        return;
      }
      console.log(`¡La batalla comienza entre ${character.name} y ${enemy.name}!`);
      while (character.health > 0 && enemy.health > 0) {
        console.log("\nTurno del personaje:");
        if (character instanceof Warrior && enemy instanceof Mage) {
          character.attackEnemy(enemy); 
        } else if (character instanceof Mage && enemy instanceof Warrior) {
          character.spendMagic(enemy); 
        }
        if (enemy.health <= 0) {
          console.log(`¡${enemy.name} ha sido derrotado!`);
          break; 
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("\nTurno del enemigo:");
        if (enemy instanceof Warrior && character instanceof Mage) {
          enemy.attackEnemy(character); 
        } else if (enemy instanceof Mage && character instanceof Warrior) {
          enemy.spendMagic(character); 
        }
          if (character.health <= 0) {
          console.log(`¡${character.name} ha sido derrotado!`);
          character.lose
          break; 
        } else{
            character.win
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Ha ocurrido un error en la batalla:', error);
    }
  }
  
async function giveReward(character: Warrior | Mage): Promise<void> {
    try {
      console.log('¡Recibiendo recompensa...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`¡${character.name} ha recibido 10 puntos de experiencia!`);
      character.experience+= 10; 
    } catch (error) {
      console.error('Error al otorgar la recompensa:', error);
    }
  }
async function handleEventResponse(enemy: Warrior | Mage): Promise<void> {
    try {
        if (enemy.health <= 20) {
            throw new Error(`${enemy.name} no tiene suficiente salud para participar en el evento.`);
        }
        console.log(`${enemy.name} está decidiendo cómo responder al evento...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`${enemy.name} ha decidido participar en el evento.`);
    } catch (error) {
        console.error(error);
    }
}
