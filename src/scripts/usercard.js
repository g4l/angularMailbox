MailApp.service('MyUsers', function($http) {
    this.getAll = () => {
        return $http.get('//test-api.javascript.ru/v1/avoznuk2/users').then(response => response.data)
    }

    this.addUser = (user) => {

        return $http.post('//test-api.javascript.ru/v1/avoznuk2/users', user)
            .then(response => response.data)
    }
    this.remove = (user) => {
        return $http.delete('//test-api.javascript.ru/v1/avoznuk2/users/' + user._id);
    }
});

MailApp.component('contactBtn', {
    bindings: {
        getcontacts: '&'
    },
    templateUrl: 'templates/userCard/contactBtn.html'
})
    .component('userCartItem', {
        bindings: {
            user: '<',
            remove: '&',
            setshow: '&',
            show: '<',
        },
        templateUrl: 'templates/userCard/userItemTemplate.html'
    })
    .component('newUserForm', {
        bindings: {
            newuser: '<',
            send: '&'

        },
        templateUrl: 'templates/userCard/newUserForm.html'
    })
MailApp.config(function($stateProvider) {
    $stateProvider.state('userCart', {
        url: 'users',
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

})