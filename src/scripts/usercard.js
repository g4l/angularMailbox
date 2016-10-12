// MailApp
// .service('MyUserCarts', function($http) {
//     this.getAll = () => {
//       return $http.get('https://test-api.javascript.ru/v1/avoznuk2/users').then(response => response.data)
//     }

//     this.addUser = (user) => {
    
//       return $http.post('https://test-api.javascript.ru/v1/avoznuk2/users', user)
//         .then(response => response.data)
//     }
//     this.remove = (user) => {
//       return $http.delete('https://test-api.javascript.ru/v1/avoznuk2/users/' + user._id);
//     }
//   })

// .component('userCart', {
//         bindings: {
//           user: '<'
//         },
//         templateUrl: 'templates/userCardTemplate.html',
//         controller: function(MyUserCarts, $http) {

//           this.getAllUsers = () => {
//             MyUserCarts.getAll().then(users => this.users = users);
//             console.log(this.users)
//           }

//           this.addUser = () => {
//             let newUser = {
//               fullName: this.newFullName.trim(),
//               email: this.newEmail.trim(),
//               avatarUrl: this.newAvatarUrl.trim(),
//               birthdate: this.newBirthdate.trim(),
//               gender: this.newGender.trim(),
//               address: this.newAddress.trim()
//             };

//             if (newUser.fullName && newUser.email) {

//               MyUserCarts.addUser(newUser).then((user) => {

//                 this.users.push(user);
//                 this.newFullName = this.newEmail = this.newAvatarUrl = this.newBirthdate = this.newGender = this.newAddress = '';
//               });
//             }
//           };

//           this.removeUser = (user) => {
//             MyUserCarts.remove(user).then(() => {
//               this.users.splice(this.users.indexOf(user), 1);
//             })
//           };
//         }
//       })
// .component('contactBtn', {
//   bindings: {
//     getcontacts: '&'
//   },
//   templateUrl: 'templates/contactBtn.html'
// })
// .component('userCartItem', {
//   bindings: {
//     user: '<',
//     remove: '&'
//   },
//   templateUrl: 'templates/userItemTemplate.html'
// });