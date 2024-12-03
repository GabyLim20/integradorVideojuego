import { Mage } from "../model/mageModel";
import { Warrior } from "../model/warriorModel";

export async function battle(character: Warrior | Mage, enemy: Warrior | Mage): Promise<void> {
    try {
        console.log(`¡La batalla comienza entre ${character.name} y ${enemy.name}!`);
        while (character.health > 0 && enemy.health > 0) {
            // Turno del personaje
            console.log("\nTurno del personaje:");
            if (character instanceof Warrior && enemy instanceof Mage) {
                character.attackEnemy(enemy);
            } else if (character instanceof Mage && enemy instanceof Warrior) {
                character.spendMagic(enemy);
            }

            // Verificación si el enemigo fue derrotado
            if (enemy.health <= 0) {
                console.log(`¡${enemy.name} ha sido derrotado!`);
                break;
            }

            // Esperar antes de continuar el turno del enemigo
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Turno del enemigo
            console.log("\nTurno del enemigo:");
            if (enemy instanceof Warrior && character instanceof Mage) {
                enemy.attackEnemy(character);
            } else if (enemy instanceof Mage && character instanceof Warrior) {
                enemy.spendMagic(character);
            }

            // Verificación si el personaje fue derrotado
            if (character.health <= 0) {
                console.log(`¡${character.name} ha sido derrotado!`);
                break;
            }

            // Esperar antes de la siguiente ronda de ataque
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
