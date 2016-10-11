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
