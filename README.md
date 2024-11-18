# 🎮 Videojuego 👾  

Este proyecto tiene como objetivo implementar un servidor y un cliente **TCP** que permite gestionar una biblioteca. El usuario puede listar, agregar y buscar a través de comandos enviados desde el cliente al servidor.

## Estructura del Proyecto ✨🤓

#### 📁 videojuegoApi
| Estructura                     | Descripción                                                           |
|--------------------------------|-----------------------------------------------------------------------|
| 📁 controllers                 | Contiene los controladores para manejar la lógica del juego.          |
| └── gameController.ts          | Controlador principal para gestionar las operaciones del videojuego.  |
| 📁 models                      | Contiene los modelos de datos que representan las entidades del juego.|
| └── characterModel.ts          | Modelo que interactúa con los datos de los personajes.               |
| └── mageModel.ts               | Modelo que gestiona las habilidades mágicas.                         |
| └── missionModel.ts            | Modelo para manejar las misiones del juego.                          |
| └── warriorModel.ts            | Modelo para gestionar los ataques y defensas.                        |
| 📁 views                       | Contiene las vistas que interactúan con el usuario.                  |
| └── index.ts                   | Punto de entrada del proyecto.                                       |
| README.md                      | Instrucciones y detalles del proyecto.                               |
| package.json                   | Archivo de configuración del proyecto.                               |


## 🎯🚀 Skills

- Typescript
- MVC
- Herencias
- Programación Asíncrona
- Promesas y Callbacks

##  👩🏻‍💻📓✍🏻💡 Como configurar el Proyecto
### Pasos a seguir en consola**
Ejecuta el siguiente bloque de comandos en tu terminal para configurar el proyecto:

**1. Instalar la dependencia**
```bash
  npm install
```
**2. Inicializar el proyecto**
```bash
  npm init -y
```
**3. Instalar la dependencia**
```bash
  npm install typescript ts-node @types/node --save-dev
```

**4. Configura TypeScript**
```bash
  npx tsc --init
```

#### 📜🛠️ Ejecución
El proyecto inicializa con:
```bash
  npm start
```


---
Desarrollado con 💜 por Gaby by [Ada](https://adaitw.org/)