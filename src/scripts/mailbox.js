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

let mainMailTemplate = formTermplate + `
    <button class="btn btn-primary" type="button" ng-click="$ctrl.getLetters(mailbox._id)" ng-repeat="mailbox in $ctrl.mailboxes">
       {{mailbox.title}}
    </button>
    <br>
    <div ng-repeat="letter in $ctrl.letters">
      <mailview letter="letter"></mailview>
    </div>`;

    let mainTemplate = `<form ng-submit="$ctrl.addUser()" >
                               <input class="form-control" placeholder="Name" ng-model="$ctrl.newFullName"></input>
                               <input class="form-control" placeholder="E-mail" ng-model="$ctrl.newEmail"></input>
                               <input class="form-control" placeholder="AvatarURL" ng-model="$ctrl.newAvatarUrl"></input>
                               <input class="form-control" placeholder="Birthdate" ng-model="$ctrl.newBirthdate"></input>
                               <input class="form-control" placeholder="Gender" ng-model="$ctrl.newGender"></input>
                               <input class="form-control" placeholder="Address" ng-model="$ctrl.newAddress"></input>
                               <button ng-submit="$ctrl.addUser()" class="btn btn-primary">OK</button>
                         </form>
                               <div class="container">
                                 <div class="row">
                                   <div class="col-md-6">
                                     <div ng-repeat = "user in $ctrl.users">
                                       <user-cart-item user="user" remove="$ctrl.removeUser(user)"></user-сart-item>
                                     </div>
                                     
                                   </div>
                                 </div>
                               </div>`;

     let usersTemplates = `<div class="panel panel-info">
                             <div class="panel-heading">
                               <img ng-src="{{$ctrl.user.avatarUrl}}" alt="{{$ctrl.user.fullName}}">
                               <h3 class="panel-title">{{$ctrl.user.fullName}}</h3>
                               <button class="destroy" ng-click="$ctrl.remove({user:$ctrl.user})"></button>
                             </div>
                             <div class="panel-body">
                               <div class="row">
                                 <div class=" col-md-9 col-lg-9 ">
                                   <table class="table table-user-information">
                                     <tbody>
                                     <tr><td>Дата рождения</td><td>{{$ctrl.user.birthdate}}</td></tr>
                                     <tr><td>Пол</td><td>{{$ctrl.user.gender}}</td></tr>
                                     <tr><td>Адрес</td><td>{{$ctrl.user.address}}</td></tr>
                                     <tr><td>Email</td><td><a ng-href="mailto:{{$ctrl.user.email}}">{{$ctrl.user.email}}</a></td>
                                     </tbody>
                                   </table>
                                 </div>
                               </div>
                             </div>
                           </div>`;


const MailApp = angular.module('myApp', []);

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
  .service('MyUserCarts', function($http) {
    this.getAll = () => {
      return $http.get('http://test-api.javascript.ru/v1/avoznuk/users').then(response => response.data)
    }

    this.add = (user) => {
    
      return $http.post('http://test-api.javascript.ru/v1/avoznuk/users', user)
        .then(response => response.data)
    }
    this.remove = (user) => {
      return $http.delete('http://test-api.javascript.ru/v1/avoznuk/users/' + user._id);
    }
  })
  .component('mailbox', {
    bindings: {},
    template: mainMailTemplate,
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
})
  .component('userCart', {
          template: mainTemplate,
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
          template: usersTemplates
        });;