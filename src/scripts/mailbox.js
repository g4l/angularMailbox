MailApp.service('MyMailBox', function($http) {

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
    .config(function($stateProvider) {
        $stateProvider.state('userCart', {
            url: 'users',
            template: `
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal"  ng-click="$ctrl.setModal('2')">Новый контакт</button>
            <br/>
            <div ng-repeat = "user in $ctrl.users">
              <user-cart-item user="user" remove="$ctrl.removeUser(user)" show="$ctrl.show" setshow="$ctrl.setShow(id)"></user-сart-item>
            </div>`
        });
    })
    .config(function($stateProvider) {
        $stateProvider.state('userCartItem', {
            parent: 'userCart',
            url: '/:userId',
            template: `<user-cart-item user-id="userId" />`,
            controller: function($stateParams, $scope) {
                $scope.userId = $stateParams.userId;
            }
        });

    })
    // .config(function($stateProvider) {
    //     $stateProvider.state('modalAddLetter', {
    //         url: '/addletter',
    //         template: `<new-letter-form />`,
    //     });

    // });

    MailApp.component('mailwrapper', {
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

            this.setShow = (id) => {
              this.show = id
            }
            this.setModal = (id) => {
              this.modal = id
              console.log(this.modal)
            }

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
            letter: '<',
            setshow: '&',
            show: '<'
        },
        templateUrl: 'templates/letterItem.html'
    })
    .component('addLetterBtn', {
      bindings: {
        setmodal: '&'
      },
      templateUrl: 'templates/addLetterBtn.html'
    })
    .component('newLetterForm', {
      bindings: {
        newletter: '=',
        send: '&'
      },
      templateUrl: 'templates/newLetterForm.html'
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
        remove: '&',
        setshow: '&',
        show: '<',
      },
      templateUrl: 'templates/userItemTemplate.html'
    })
    .component('newUserForm', {
      bindings: {
        newletter: '=',
        send: '&'
      },
      templateUrl: 'templates/newUserForm.html'
    })
    .component('modal', {
      bindings: {
        modal: '<'
      },
      templateUrl: 'templates/modalwrapper.html'
    });
