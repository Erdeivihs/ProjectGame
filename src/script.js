import { Login } from "./components/login&signup.js";
import { router } from "./router/router.js";
(()=>{ 

    document.addEventListener("DOMContentLoaded", function () {
      window.location.hash = '#/login';
      router(window.location.hash);
  
    });

    window.addEventListener("hashchange", () => {
      router(window.location.hash);
    });
})();