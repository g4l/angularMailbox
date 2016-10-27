class ContactsController{
	constructor($scope, $log, ContactsData) {
		this.$scope = $scope;
		this.$log = $log;
		this.ContactsData = ContactsData;
		this.contacts = [];		
		this.getAllContacts();
	}
	getAllUsers() {
	    this.ContactsData.getAllUsers().then(users => this.users = users);

	}

	addUser() {
	    let newUser = {
	        fullName: this.newFullName.trim(),
	        email: this.newEmail.trim(),
	        avatarUrl: this.newAvatarUrl.trim(),
	        birthdate: this.newBirthdate.trim(),
	        gender: this.newGender.trim(),
	        address: this.newAddress.trim()
	    };

	    if (newUser.fullName && newUser.email) {

	        this.ContactsData.addUser(newUser).then((user) => {

	            this.users.push(user);
	            this.newFullName = this.newEmail = this.newAvatarUrl = this.newBirthdate = this.newGender = this.newAddress = '';
	        });
	    }
	};
	removeUser(user) {
	    this.ContactsData.removeUser(user).then(() => {
	        this.users.splice(this.users.indexOf(user), 1);
	    })
	}
	// old
	// getAllContacts() {
	// 	// this.$scope.$emit('startLoading');
	// 	this.ContactsData.getAllContacts()
	// 		.then( contacts => {
	// 			this.contacts = contacts;
	// 			this.$scope.$emit('stopLoading');
	// 		})
	// 		// .catch(error => {
	// 		// 	this.$log.error("contacts component error >>>>>", error);
	// 		// 	this.$scope.$emit('stopLoading');
	// 		// 	this.$scope.$emit('showError', error.status + ' ' + error.statusText);			
	// 		// })
	// }
	
	// deleteContact(contactId) {
	// 	this.ContactsData.deleteContact(contactId).then( () => {					
	// 		this.contacts = this.contacts.filter(i => i._id != contactId);
	// 	})
	// 	// .catch(error => {
	// 	// 	this.$log.error("contacts component error on delete contact >>>>>", error);		
	// 	// 	this.$scope.$emit('showError', error.status + ' ' + error.statusText);			
	// 	// })
	// }
	// createUser(user) {				
	// 	// this.$scope.$emit('startLoading');
	// 	this.ContactsData.createContact(user).then( (response) => {						
	// 		this.contacts.push(response);
	// 		this.$scope.$emit('stopLoading');
	// 	})
	// 	// .catch(error => {
	// 	// 	this.$log.error("contacts component error on save contact >>>>>", error);
	// 	// 	this.$scope.$emit('stopLoading');
	// 	// 	this.$scope.$emit('showError', error.status + ' ' + error.statusText);			
	// 	// })
 //  }
}

ContactsController.$inject = ['$scope', '$log', 'ContactsData'];
export default ContactsController;