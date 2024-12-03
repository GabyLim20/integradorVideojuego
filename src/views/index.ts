import { Character, Character as rol } from "../model/characterModel";
import { createCharacter,listCharacters,updateCharacter,deleteCharacter,assignMission,showMissions,completeMission2,batle } from "../controller/gameLogic";

const readline = require("readline-sync");
let charactersList: rol[] = [];
let gameRunning = true;

async function showMenu():Promise <void> {
    if (!gameRunning) {
        console.log("El juego ha terminado.");
        return;
    }
    let option: string;
    do {
        console.log("\n--- Menú ---");
        console.log("1. Crear personaje");
        console.log("2. Listar personajes");
        console.log("3. Actualizar personaje");
        console.log("4. Eliminar personaje");
        console.log("5. Asignar Misión");
        console.log("6. Completar Misión");
        console.log("7. Listado Misiones");
        console.log("8. Batalla");
        console.log("9. Continuar pelea y salir");
        option = readline.question("Elige una opción: ");
        switch (option) {
            case "1":
                let name = readline.question("¿Cuál es el nombre? ");
                const items = readline.question("¿Cuál es el inventario?🏷️ (separados por coma) ");
                const inventory = items ? items.split(",").map((item: string) => item.trim()) : [];
                createCharacter(name, 1, 90, 0, inventory);
                break;
            case "2":
                listCharacters();
                break;
            case "3":
                let nameSearch = readline.question("¿Cuál es el nombre del personaje a buscar? ");
                console.log(`Buscando personaje: ${nameSearch}`); 
                let foundCharacter = charactersList.find(character =>
                    character.name.trim().toLowerCase() === nameSearch.trim().toLowerCase()
                );
                if (foundCharacter) {
                    console.log(`Personaje encontrado: ${nameSearch}`);  
                    updateCharacter(
                        nameSearch,
                        new Character(
                            nameSearch,
                            parseInt(readline.question("Nuevo nivel: ")),
                            parseInt(readline.question("Nueva salud: ")),
                            parseInt(readline.question("Nueva experiencia: ")),
                            readline.question("Nuevo inventario (separados por coma): ").split(','),
                        )
                    );
                } else {
                    console.log(`Personaje con el nombre ${nameSearch} no encontrado.❌`);
                }
                break;
            case "4":
                const deleteByName = readline.question("¿Cuál es el nombre del personaje ha eliminar?😵 ");
                deleteCharacter(deleteByName);
                break;
            case "5":
                const nameAsign = readline.question("¿Cuál es el nombre? 🔍 ");
                const mission = readline.question("¿Qué tipo de mision deseas?🚀(Main, Side, Event)\n")
                assignMission(nameAsign, mission);
                break;
            case "6":
                const nameFound = readline.question("¿Cuál es el nombre? 🔍 ");
            showMissions(nameFound);
            const id = readline.question("¿Cuál es el la misión que deseas completar(Ingresa el número)? 🔍 ");
            completeMission2(nameFound,id)
                break;
            case "7":
                const nameM = readline.question("¿Cuál es el nombre? 🔍 ");
                showMissions(nameM);
            break;
            case "8":
            const user = await readline.question("¿Cuál es el nombre? ");
            batle(user)
            break;
            case "9":
                break;
            default:
                console.log("Opción no válida ❌, por favor elige nuevamente.🤔");
        }
    } while (option !== "9");
}
showMenu();
