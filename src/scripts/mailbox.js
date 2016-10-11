let formTermplate = `<form ng-submit="$ctrl.addMail()" class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="title" ng-model="$ctrl.newSubject"></input>
        <label>To</label>
        <input type="email" class="form-control" placeholder="To" ng-model="$ctrl.newTo"></input>
        <label>Description</label>
        <textarea class="form-control" placeholder="descriptions" ng-model="$ctrl.newBody"></textarea>
        <br>
        <button class="btn btn-success" ng-submit="$ctrl.addMail()">Ok</button>
    </form>`

let mainTemplate = formTermplate + `
    <button class="btn btn-primary" type="button" ng-click="$ctrl.getLetters(mailbox._id)" ng-repeat="mailbox in $ctrl.mailboxes">
       {{mailbox.title}}
    </button>
    <br>
    <div ng-repeat="letter in $ctrl.letters">
      <mailview letter="letter"></mailview>
    </div>`;



const MailApp = angular.module('myApp', []);

MailApp.service('MyMails', function($http) {
  
    this.getAllLetters = () => {
      return $http.get('//test-api.javascript.ru/v1/avoznuk2/letters')
        .then(response => response.data)
    }
    this.getMailBoxes = () => {
      return $http.get('//test-api.javascript.ru/v1/avoznuk2/mailboxes')
        .then(response => response.data)
    }

    this.add = (mail) => {
      return $http.post('//test-api.javascript.ru/v1/avoznuk2/letters', mail)
        .then(response => response.data)
    }
  })
  .component('mailbox', {
    bindings: {},
    template: mainTemplate,
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
  });

MailApp.component('mailview', {
  bindings: {
    letter: '<'
  },
  templateUrl: 'templates/letterItem.html'
});