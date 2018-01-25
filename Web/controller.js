(function () {
    "use strict";

    angular.module('myApp', ['ui.bootstrap'])

        // main controller
        .controller('AppCtrl', function ($scope, $uibModal, $log) {

            //$scope.name = 'wendy';
            $scope.items = ['item1', 'item2', 'item3'];

            $scope.selected = [];

            $scope.openComponentModal = function () {
                angular.element('.nav-tabs a[data-target="#personEntity"]').tab('show');
                var modalInstance = $uibModal.open({
                    component: 'modalComponent',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('modal-component dismissed at: ' + new Date());
                });
            };
        })

        // modal component
        .component('modalComponent', {
            templateUrl: 'modalTemplate.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            // modal controller
            controller: function () {
                var $ctrl = this;

                $ctrl.$onInit = function () {
                    angular.element('.nav-tabs a[data-target="#organizationEntity"]').tab('show');
                    $ctrl.items = $ctrl.resolve.items;
                    $ctrl.selected = {
                        item: $ctrl.items[0]
                    };
                };

                $ctrl.ok = function (item) {
                    console.log(item);
                    console.log("gonna grab this data to send and update/add");
                    $ctrl.close({ $value: $ctrl.selected.item });
                };

                $ctrl.cancel = function () {
                    $ctrl.dismiss({ $value: 'cancel' });
                };
            }
        });

})();
