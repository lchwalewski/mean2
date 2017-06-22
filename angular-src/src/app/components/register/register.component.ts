import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
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

	constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) {}

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
	}
}
