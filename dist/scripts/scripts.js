MailApp.component('mailwrapper', {
    templateUrl: 'templates/mailwrapper.html',
    controller: function(MyMailBox, MyUsers) {

        MyMailBox.getAllLetters().then(mails => {
            this.mails = mails
        });

        MyMailBox.getMailCategories().then(mailcategories => {

            this.mailcategories = mailcategories;

        })

        this.getLetters = (id) => {

            this.letters = this.mails.filter(function(mail) {
                return mail.mailbox == id
            })

        }
// remove
        this.addMail = (letter) => {
            console.log(letter)
            let newMail = {
                subject: this.newSubject.trim(),
                body: this.newBody.trim(),
                to: this.newTo.trim(),
                mailbox: this.mailcategories[1]._id
            };

            if (newMail.subject && newMail.body && newMail.to) {

                MyMailBox.addLetter(newMail).then((mail) => {
                    this.mails.push(mail);
                    this.newSubject = this.newBody = this.newBody = this.newTo = '';
                });

            }
        };

        this.getAllUsers = () => {
            MyUsers.getAll().then(users => this.users = users);

        }

        this.addUser = () => {
            let newUser = {
                fullName: this.newFullName.trim(),
                email: this.newEmail.trim(),
                avatarUrl: this.newAvatarUrl.trim(),
                birthdate: this.newBirthdate.trim(),
                gender: this.newGender.trim(),
                address: this.newAddress.trim()
            };

            if (newUser.fullName && newUser.email) {

                MyUsers.addUser(newUser).then((user) => {

                    this.users.push(user);
                    this.newFullName = this.newEmail = this.newAvatarUrl = this.newBirthdate = this.newGender = this.newAddress = '';
                });
            }
        };
        this.removeUser = (user) => {
            MyUsers.remove(user).then(() => {
                this.users.splice(this.users.indexOf(user), 1);
            })
        };
        // end remove

        this.setShow = (id) => {
            this.show = id
        }
        this.setModal = (id) => {
            this.modal = id
        }



    }
})


.component('modal', {
    bindings: {
        modal: '<'
    },
    templateUrl: 'templates/modalwrapper.html'
});
MailApp
    .service('MyMailBox', function($http) {

        this.getAllLetters = () => {
            return $http.get('https://test-api.javascript.ru/v1/avoznuk2/letters')
                .then(response => response.data)
        }
        this.getMailCategories = () => {
            return $http.get('//test-api.javascript.ru/v1/avoznuk2/mailboxes')
                .then(response => response.data)
        }

        this.addLetter = (mail) => {
            return $http.post('//test-api.javascript.ru/v1/avoznuk2/letters', mail)
                .then(response => response.data)
        }

    });

MailApp.config(function($stateProvider) {
    $stateProvider.state('category', {
        url: 'category/:categoryId',
        template: `
                <mailview category-id="categoryId" ng-repeat="letter in $ctrl.letters" letter="letter"  show="$ctrl.show" setshow="$ctrl.setShow(id)"></mailview>`,
        controller: function($stateParams, $scope) {
            $scope.categoryId = $stateParams.categoryId;
        }
    });

})
    .config(function($stateProvider) {
        $stateProvider.state('mailview', {
            parent: 'category',
            url: '/:letterId',
            template: `<mailview letter-id="letterId"/>`,
            controller: function($stateParams, $scope) {
                $scope.letterId = $stateParams.letterId;
            }
        });

    })
MailApp.component('mailcategories', {
    bindings: {
        mailcategory: '<',
        getletters: '&'
    },
    templateUrl: 'templates/mailBox/mailCategoryTemplate.html',

})
    .component('mailview', {
        bindings: {
            letter: '<',
            setshow: '&',
            show: '<'
        },
        templateUrl: 'templates/mailBox/letterItem.html'
    })
    .component('addLetterBtn', {
        bindings: {
            setmodal: '&'
        },
        templateUrl: 'templates/mailBox/addLetterBtn.html'
    })
    .component('newLetterForm', {
        bindings: {
            newletter: '&',
            send: '&',
            modal: "<"
        },
        templateUrl: 'templates/mailBox/newLetterForm.html'
    })
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