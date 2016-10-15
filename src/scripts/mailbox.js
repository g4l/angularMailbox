MailApp
    .service('MyMailBox', function($http) {

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
MailApp.component('mailcategories', {
    bindings: {
        mailcategory: '<',
        getletters: '&'
    },
    templateUrl: 'templates/mailBox/mailCategoryTemplate.html',

})
    .component('mailview', {
        bindings: {
            letter: '<',
            setshow: '&',
            show: '<'
        },
        templateUrl: 'templates/mailBox/letterItem.html'
    })
    .component('addLetterBtn', {
        bindings: {
            setmodal: '&'
        },
        templateUrl: 'templates/mailBox/addLetterBtn.html'
    })
    .component('newLetterForm', {
        bindings: {
            newletter: '&',
            send: '&',
            modal: "<"
        },
        templateUrl: 'templates/mailBox/newLetterForm.html'
    })