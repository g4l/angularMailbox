MailApp.service('loginService', function($state){
	let admin = {
		email: 'test1@ukr.net',
		password: '12345'
	}
	this.testLogin = (user) => {
		if(user.email == admin.email && user.password == admin.password){
			$state.go('mailwrapper')
		} else {
			alert('Не правильный пароль или логин')
		}
	}

});
MailApp.config(function($stateProvider, $locationProvider){
	$stateProvider.state('loginPage', {
		url: '/',
		template: `<login-page/>`
	});
	$locationProvider.html5Mode(true);
});
MailApp.component('loginPage', {
	templateUrl: 'templates/loginPage.html',
	controller: function(loginService, $state){
		this.login = () => {
	
			let userLogin = {
				email: this.userEmail,
				password: this.userPassword
			};
			if (!!userLogin.email && !!userLogin.password) {
				loginService.testLogin(userLogin)
			} 
		}
	}
})