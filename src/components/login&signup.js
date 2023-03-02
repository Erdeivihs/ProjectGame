const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttd255aGdjZ3FjYXF5ZWZhaGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3OTE4MTMsImV4cCI6MTk4MjM2NzgxM30.m66eKq7oem5NZV4ocphhwDDxXKViReKbI-VKmaIJTf8";
let access_token = ";"

import { router } from "../router/router.js";
import { loginUser, registerUser } from "../services/users.js";

export { Login }

class Login {

	constructor() { }

	renderLogin() {
		let div = document.querySelector("#principal");
		div.innerHTML = `
			<link rel="stylesheet" type="text/css" href="./assets/css/login.css">
			<div class="main">  	
			<input type="checkbox" id="chk" aria-hidden="true">

			<div class="login">
					<form id="formLogin">
						<label for="chk" aria-hidden="true">Login</label>
						<input type="email" id="email" name="email" placeholder="Email" required="">
						<input type="password" id="password" name="password" placeholder="Password" required="">
						<button type="button" id="login">Login</button>
					</form>
				</div>

				<div class="signup">
					<form id="formRegistre">
						<label for="chk" aria-hidden="true">Sign up</label>
						<div color="red" id="resultats">
						<input type="email" id="signupemail" name="email" placeholder="Email" required="">
						<input type="password" id="signuppassword" name="password" placeholder="Password" required="">
						<button type="button" id="registrar">Sign up</button>
					</form>
				</div>

				
			</div>`
	
		;

		//LOGIN SUPABASE

		document.querySelector("#login").addEventListener("click", async ()=>{
				let email = document.querySelector("#email").value;
				let password = document.querySelector("#password").value;

				loginUser(email,password).then(status =>{
					if (status.success) window.location.hash = '#/menu';	
					 else {
						divLogin.querySelector('#errors').innerHTML = status.errorText;
					}
				})
			
		});

		//REGISTRE SUPABASE

		document.querySelector("#registrar").addEventListener("click", async ()=>{
			
				let email = document.querySelector('#signupemail').value;
				let password = document.querySelector('#signuppassword').value;
				let dataLogin = await registerUser(email,password);
				console.log(dataLogin);
				window.location.hash = '#/login';
		});

	}

	

}