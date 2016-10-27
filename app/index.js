import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactsModule from './components/Contacts/contacts.module.js'

angular.module('myApp', [uiRouter, ContactsModule]);