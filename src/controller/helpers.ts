import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";
export async function battle(character: Warrior | Mage, enemy: Warrior | Mage): Promise<void> {
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
          break; 
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Ha ocurrido un error en la batalla:', error);
    }
}
  export async function giveReward(character: Warrior | Mage): Promise<void> {
    try {
      console.log('¡Recibiendo recompensa...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`¡${character.name} ha recibido 10 puntos de experiencia!`);
      character.experience+= 10; 
    } catch (error) {
      console.error('Error al otorgar la recompensa:', error);
    }
}
