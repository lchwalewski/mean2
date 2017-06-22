import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	firstName: String;
	lastName: String;
	email: String;
	password: String;

	constructor(
		private validateService: ValidateService,
		private flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit() {}
	onRegisterSubmit() {
		const user = {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password
		};
		//Required fields
		if (!this.validateService.validateRegister(user)) {
			this.flashMessagesService.show('Fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
			return false;
		}
		if (!this.validateService.validateEmail(user.email)) {
			this.flashMessagesService.show('Use valid email', { cssClass: 'alert-danger', timeout: 3000 });
			return false;
		}
		//Register User
		this.authService.registerUser(user).subscribe((data) => {
			if (data.success) {
				this.flashMessagesService.show('You are now registered!', { cssClass: 'alert-success', timeout: 3000 });
				this.router.navigate([ '/login' ]);
			} else {
				this.flashMessagesService.show('You are not registered! Try again!', {
					cssClass: 'alert-danger',
					timeout: 3000
				});
				this.router.navigate([ '/register' ]);
			}
		});
	}
}
