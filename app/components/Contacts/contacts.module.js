import angular from 'angular';
import ContactsComponent from './contacts.component.js';
import ContactsData from './contacts.service.js'

// let ContactsModule = angular.module('contacts', [ContactModule, CreateContactModule])
// 	.component('contacts', ContactsComponent)
// 	.service('ContactsDataSvc', ContactsDataSvc)
// 	.name;

let ContactsModule = function(){
	console.log('work!!!')
}

export default ContactsModule;