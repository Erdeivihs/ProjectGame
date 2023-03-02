export { router };
import { Login } from "../components/login&signup.js";
import { Menu } from "../components/menu.js";
import { indiegame } from "../views/indie.js";
import { shootergame } from "../views/shooter.js";
import { plataformeogame } from "../views/plataforma.js";
import { deportesgame } from "../views/deportes.js";
import { carrerasgame } from "../views/carreras.js";

const router = (route) => {
  console.log(route);
  
    switch (route) {
      case "#/menu":
        let M = new Menu();
        M.rendermenu();
        break;
      case "#/login":
        console.log("login");
        let login = new Login();
        login.renderLogin();
        break;
      case "#/indie":
        indiegame();
        break;
      case "#/shooter":
        shootergame();
        break;
      case "#/plataformeo":
          plataformeogame();
          break;
      case "#/deportes":
        deportesgame();
          break;
      case "#/carreras":
          carrerasgame();
          break;

    }
  
};