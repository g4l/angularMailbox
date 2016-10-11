MailApp.service('MyMails', function($http) {

        this.getAllLetters = () => {
            return $http.get('https://test-api.javascript.ru/v1/avoznuk2/letters')
                .then(response => response.data)
        }
        this.getMailBoxes = () => {
            return $http.get('https://test-api.javascript.ru/v1/avoznuk2/mailboxes')
                .then(response => response.data)
        }

        this.add = (mail) => {
            return $http.post('https://test-api.javascript.ru/v1/avoznuk2/letters', mail)
                .then(response => response.data)
        }
    })
    .config(function($stateProvider) {
        $stateProvider.state('mailbox', {
            url: 'mailbox/:mailboxId',
            template: `<mailbox mailbox-id="mailboxId"/>`,
            controller: function($stateParams, $scope) {
                $scope.mailboxId = $stateParams.mailboxId;
            }
        });

    })
    .component('mailbox', {
        bindings: {},
        templateUrl: 'templates/mailboxTemplate.html',
        controller: function(MyMails, $http) {

            MyMails.getAllLetters().then(mails => {
                this.mails = mails
            });

            this.getLetters = (id) => {

                this.letters = this.mails.filter(function(mail) {
                    return mail.mailbox == id
                })

            }

            MyMails.getMailBoxes().then(mailboxes => {
                this.mailboxes = mailboxes
            })

            this.addMail = () => {
                let newMail = {
                    subject: this.newSubject.trim(),
                    body: this.newBody.trim(),
                    to: this.newTo.trim(),
                    mailbox: this.mailboxes[1]._id
                };

                if (newMail.subject && newMail.body && newMail.to) {

                    MyMails.add(newMail).then((mail) => {
                        this.mails.push(mail);
                        this.newSubject = this.newBody = this.newBody = this.newTo = '';
                    });

                }
            };

        }
    })
    .component('mailview', {
        bindings: {
            letter: '<'
        },
        templateUrl: 'templates/letterItem.html'
    });

MailApp.service('MyUserCarts', function($http) {
    this.getAll = () => {
      return $http.get('https://test-api.javascript.ru/v1/avoznuk2/users').then(response => response.data)
    }

    this.add = (user) => {
    
      return $http.post('https://test-api.javascript.ru/v1/avoznuk2/users', user)
        .then(response => response.data)
    }
    this.remove = (user) => {
      return $http.delete('https://test-api.javascript.ru/v1/avoznuk2/users/' + user._id);
    }
  })
.component('userCart', {
        templateUrl: 'templates/userCardTemplate.html',
        controller: function(MyUserCarts, $http) {
          MyUserCarts.getAll().then(users => this.users = users);

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

              MyUserCarts.add(newUser).then((user) => {

                this.users.push(user);
                this.newFullName = this.newEmail = this.newAvatarUrl = this.newBirthdate = this.newGender = this.newAddress = '';
              });
            }
          };

          this.removeUser = (user) => {
            MyUserCarts.remove(user).then(() => {
              this.users.splice(this.users.indexOf(user), 1);
            })
          };
        }
      })
      .component('userCartItem', {
        bindings: {
          user: '<',
          remove: '&'
        },
        templateUrl: 'templates/userItemTemplate.html'
      });