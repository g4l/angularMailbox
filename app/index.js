import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactsModule from './components/Contacts/contacts.module.js'
import CommonRoutes from './common/common.route.js'

angular.module('myApp', [uiRouter, ContactsModule,CommonRoutes]);