class ContactsData {
    constructor($http) {
        this.$http = $http;
    }

    getAllUser() {
        return this.$http.get('//test-api.javascript.ru/v1/avoznuk2/users').then(response => response.data)
    }

    addUser(user) {

        return this.$http.post('//test-api.javascript.ru/v1/avoznuk2/users', user)
            .then(response => response.data)
    }
    removeUser(user) {
        return this.$http.delete('//test-api.javascript.ru/v1/avoznuk2/users/' + user._id);
    }
}

ContactsData.$inject = ['$http'];

export default ContactsData;
