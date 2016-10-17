MailApp.config(function($stateProvider) {
    $stateProvider.state('mailwrapper', {
        url: 'mailbox',
        template: `<mailwrapper></mailwrapper>`
    });

})
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