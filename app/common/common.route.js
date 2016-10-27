function CommonRoutes($stateProvider, $urlRouterProvider)  {
	$stateProvider.state('mailwrapper', {
	    url: 'mailbox',
	    template: `<mailwrapper></mailwrapper>`
	});

	$stateProvider.state('userCart', {
	    url: '/users',
	    parent: 'mailwrapper',
	    template: `
	        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal"  ng-click="$ctrl.setModal('2')">Новый контакт</button>
	        <br/>
	        <div ng-repeat = "user in $ctrl.users">
	          <user-cart-item user="user" remove="$ctrl.removeUser(user)" show="$ctrl.show" setshow="$ctrl.setShow(id)"></user-сart-item>
	        </div>`
	}).state('userCartItem', {
	    parent: 'userCart',
	    url: '/:userId',
	    template: `<user-cart-item user-id="userId" />`,
	    controller: function($stateParams, $scope) {
	        $scope.userId = $stateParams.userId;
	    }
	});

	$stateProvider.state('loginPage', {
		url: '/',
		template: `<login-page/>`
	});

	$stateProvider.state('category', {
	    parent: 'mailwrapper',
	    url: '/category/:categoryId',
	    template: `
	            <mailview category-id="categoryId" ng-repeat="letter in $ctrl.letters" letter="letter"  show="$ctrl.show" setshow="$ctrl.setShow(id)"></mailview>`,
	    controller: function($stateParams, $scope) {
	        $scope.categoryId = $stateParams.categoryId;
	    }
	});

	$stateProvider.state('mailview', {
	    parent: 'category',
	    url: '/:letterId',
	    template: `<mailview letter-id="letterId"/>`,
	    controller: function($stateParams, $scope) {
	        $scope.letterId = $stateParams.letterId;
	        $scope.show = $stateParams.letterId;
	    }
	});
}

CommonRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
export default CommonRoutes;