import { router } from "../router/router.js";
export {loginSupabase, fileRequest, getFileRequest, signUpSupabase , logoutSupabase, recoverPasswordSupabase, getData, updateData, createData, getEliminar};

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttd255aGdjZ3FjYXF5ZWZhaGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3OTE4MTMsImV4cCI6MTk4MjM2NzgxM30.m66eKq7oem5NZV4ocphhwDDxXKViReKbI-VKmaIJTf8";
const urlBase = "https://kmwnyhgcgqcaqyefahho.supabase.co";
const headers = {
    "apiKey": SUPABASE_KEY,
    "Content-Type": "application/json",
}; 



///////////
////////// Per a les peticions normals a dades de la base de dades 
//////////
async function supaRequest(url,method,headers,body){
    let response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify(body)  // En cas d'enviar dades per post, put patch... 
    });
    if(response.status >=200 && response.status <=300){ // En cas d'error en el servidor
        if(response.headers.get("content-type")){ // Si retorna un JSON
            return await response.json();
        }
        return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
    }
    else{
        return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject. 
    }
}


///////////
////////// Per a les peticions a coses del storage
////////// Cal un header diferent i tractar l'eixida de manera correcta.
//////////
async function fileRequest(url,body,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
        "x-upsert": true  // Necessari per a sobreescriure
    }; 
    let response = await fetch(`${urlBase}${url}`,{
        method: 'POST',
        headers: headersFile,
        body
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.json(); // Retorna un json amb la ruta relativa. 
            datos.urlAvatar = `${urlBase}${url}`; // El que 
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function getFileRequest(url,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
    }; 
    let response = await fetch(`${url}`,{
        method: 'GET',
        headers: headersFile,
        
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.blob();
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function loginSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/token?grant_type=password`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function signUpSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/signup`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function logoutSupabase(token){ 
    let url = `${urlBase}/auth/v1/logout`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'post',headersAux,{});
    return data;
}

async function recoverPasswordSupabase(email){
    let url = `${urlBase}/auth/v1/recover`;
    let headersAux = {...headers};
    let data = await supaRequest(url,'post',headersAux,{email});
    return data;
}

async function getData(URI,token){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'get',headersAux);
    console.log(data);
    return data;
}

async function updateData(URI,token,data){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'PATCH',headersAux,data);
    return response;
}

async function createData(URI,token,data){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'post',headersAux,data);
    return response;
}

async function getEliminar(tabla, idToDelete,token) {
    let url = `${urlBase}/rest/v1/${tabla}?id=eq.${idToDelete}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'delete',headersAux);
    switch (tabla) {
        case "indie":
            window.location.hash = '#/indie';
            router(window.location.hash);
        break;
    
        case "shooter":
            window.location.hash = '#/shooter';
            router(window.location.hash);
        break;
        case "plataformeo":
            window.location.hash = '#/plataformeo';
            router(window.location.hash);
        break;
        case "deportes":
            window.location.hash = '#/deportes';
            router(window.location.hash);
        break;
        case "carreras":
            window.location.hash = '#/carreras';
            router(window.location.hash);
        break;
    }
    return data;
  }