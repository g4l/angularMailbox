MailApp.service('MyMailBox', function($http) {

        this.getAllLetters = () => {
            return $http.get('https://test-api.javascript.ru/v1/avoznuk2/letters')
                .then(response => response.data)
        }
        this.getMailCategories = () => {
            return $http.get('https://test-api.javascript.ru/v1/avoznuk2/mailboxes')
                .then(response => response.data)
        }

        this.addLetter = (mail) => {
            return $http.post('https://test-api.javascript.ru/v1/avoznuk2/letters', mail)
                .then(response => response.data)
        }
        this.getAll = () => {
          return $http.get('https://test-api.javascript.ru/v1/avoznuk2/users').then(response => response.data)
        }

        this.addUser = (user) => {
        
          return $http.post('https://test-api.javascript.ru/v1/avoznuk2/users', user)
            .then(response => response.data)
        }
        this.remove = (user) => {
          return $http.delete('https://test-api.javascript.ru/v1/avoznuk2/users/' + user._id);
        }
    })
    .config(function($stateProvider) {
        $stateProvider.state('category', {
            url: 'category/:categoryId',
            template: `
            <mailview category-id="categoryId" ng-repeat="letter in $ctrl.letters" letter="letter"></mailview>`,
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
    .config(function($stateProvider) {
        $stateProvider.state('userCartItem', {
            url: 'users',
            template: `<div ng-repeat = "user in $ctrl.users">
              <user-cart-item user="user" remove="$ctrl.removeUser(user)"></user-сart-item>
            </div>`,
            // controller: function($stateParams, $scope) {
            //     $scope.letterId = $stateParams.letterId;
            // }
        });

    })
    .component('mailwrapper', {
        templateUrl: 'templates/mailwrapper.html',
        controller: function(MyMailBox, $http) {

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

            this.addMail = () => {
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
              MyMailBox.getAll().then(users => this.users = users);
              console.log(this.users)
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

                MyMailBox.addUser(newUser).then((user) => {

                  this.users.push(user);
                  this.newFullName = this.newEmail = this.newAvatarUrl = this.newBirthdate = this.newGender = this.newAddress = '';
                });
              }
            };

            this.removeUser = (user) => {
              MyMailBox.remove(user).then(() => {
                this.users.splice(this.users.indexOf(user), 1);
              })
            };

        }
    })
    .component('mailcategories', {
        bindings: {
          mailcategory: '<',
          getletters: '&'
        },
        templateUrl: 'templates/mailCategoryTemplate.html',

    })
    .component('mailview', {
        bindings: {
            letter: '<'
        },
        templateUrl: 'templates/letterItem.html'
    })
    .component('contactBtn', {
      bindings: {
        getcontacts: '&'
      },
      templateUrl: 'templates/contactBtn.html'
    })
    .component('userCartItem', {
      bindings: {
        user: '<',
        remove: '&'
      },
      templateUrl: 'templates/userItemTemplate.html'
    });
