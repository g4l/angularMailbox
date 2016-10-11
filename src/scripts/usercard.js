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