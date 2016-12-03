    var app = angular.module('reminder', []);
    app.directive('colorLi', [function () {
        return {
            restrict: "AE",
            template: '<div class="item" data-id="{{v.id}}" ng-click="setcurrent(v,$index)"> <div class="item-content"> <div class="color {{v.class}}"></div><label for="">{{v.title}}</label> <input ng-model="v.title" type="text" > <div class="share"></div> </div> <div class="line"></div> </div>',
            replace: true,
            link: function (scope, el) {
                $(el).on('mousedown', false);
                $(el).on('keyup', false);
                $(el).on('click', function () {
                    $('.item').removeClass('active');
                    $(this).addClass('active');
                    $('.item').find('input').removeClass('active');
                });
                $(el).on('dblclick', function () {
                    var input = $(this).find('input');
                    $(this).find('label').css('display', 'none');
                    $(this).find('input').addClass('active');
                    input.val(input.val()).trigger('focus');
                });
                $(el).on('blur', 'input', function () {
                    $(this).removeClass('active');
                    $('.item').find('label').css('display', 'block');
                });
                $(document).on('keyup', function (e) {
                    if (e.keyCode === 46) {
                        id = parseInt($('.item.active').attr('data-id'));
                        console.log(id);
                        scope.lists = scope.lists.filter(function (v, i) {
                            return v.id !== id;
                        })
                    }
                })
            }
        }
    }]);
    app.directive('colorDiv', [function () {
        return {
            restrict: "AE",
            template: '<div class="circle {{v}} {{current.bg}}" ng-click="cl($index)" ng-class="current.class==v?current.class:active"><div class="collection-color-icon {{v}}"></div></div>',
            replace: true,
            link: function (scope, el) {
                $(el).on('click', function () {
                    $('.circle').removeClass('sel');
                    $(this).addClass('sel');
                })
            }

        }
    }]);
    app.controller('mainCtrl', ['$scope', function ($scope) {
        var i = 4;
        $scope.colors = ["c1 sel", "c2", "c3", "c4", "c5", "c6", "c7"];
        $scope.lists = [{
            class: "c1", id: 1, title: "新列表", bg: "s1",
            todos: [{id: 1, title: "a", state: 0}, {id: 2, title: "b", state: 0}, {id: 3, title: "c", state: 1}, {
                id: 4, title: "d", state: 1
            }]
        },
            {class: "c2", bg: "s2", id: 2, title: "新列表2", todos: []}, {
                class: "c3",
                bg: "s3",
                id: 3,
                title: "新列表3",
                todos: []
            },
            {class: "c4", bg: "s4", id: 4, title: "新列表4", todos: []}, {
                class: "c5",
                bg: "s5",
                id: 5,
                title: "新列表5",
                todos: []
            }];

        $scope.current = $scope.lists[0];
        $scope.setcurrent = function (v, index) {
            $scope.current = v;

        };
        $scope.change = function () {
            var num = 0;
            if ($scope.current.todos.length) {
                $scope.current.todos.forEach(function (v, i) {
                    if (v.state == 1) {
                        num++;
                    }
                });
                return num;
            }
        };
        $scope.add = function () {

            var max_id = -Infinity;
            $scope.lists.forEach(function (v, i) {
                if (max_id < v.id) {
                    max_id = v.id;
                }
            });
            $scope.lists.forEach(function (v, i) {

            });
            i++;
            var arr = {
                class: $scope.colors[i % 7],
                id: max_id + 1,
                title: "新列表" + (max_id + 1),
                todos:[]
            };
            $scope.lists.push(arr);
        };
        $scope.delete = function (id) {
            $('.cover').toggleClass('active');
            $('.alert').toggleClass('active');

        };
        $scope.dele = function () {
            $scope.lists = $scope.lists
        };
        $scope.no = function () {
            $('.cover').removeClass('active');
            $('.alert').removeClass('active');
        };
        $scope.nn = function () {
            $('.fixed').removeClass('active');
        };
        $scope.line = function (index) {
            $('.collection .view').eq(index).find('.background').addClass('active');
            $('.collection .view').eq(index).find('.top').addClass('active');
            $('.collection .view').eq(index).find('.bottom').addClass('active');
            $('.collection .view').eq(index).find('.background').addClass('active');
            $('.collection .view').eq(index).find('.background').addClass('active');
            $('.collection .view').eq(index - 1).find('.divider-bo').addClass('active');
        };
        $scope.uline = function (index) {
            $('.collection .view').eq(index).find('.background').removeClass('active');
            $('.collection .view').eq(index).find('.top').removeClass('active');
            $('.collection .view').eq(index).find('.bottom').removeClass('active');
            $('.collection .view').eq(index).find('.background').removeClass('active');
            $('.collection .view').eq(index).find('.background').removeClass('active');
            $('.collection .view').eq(index - 1).find('.divider-bo').removeClass('active');
        };
        $scope.line1 = function (index) {
            $('.new .view').eq(index).find('.background').addClass('active');
            $('.new .view').eq(index).find('.top').addClass('active');
            $('.new .view').eq(index).find('.bottom').addClass('active');
            $('.new .view').eq(index).find('.background').addClass('active');
            $('.new .view').eq(index).find('.background').addClass('active');
            $('.new .view').eq(index - 1).find('.divider-bo').addClass('active');
        };
        $scope.uline1 = function (index) {
            $('.new .view').eq(index).find('.background').removeClass('active');
            $('.new .view').eq(index).find('.top').removeClass('active');
            $('.new .view').eq(index).find('.bottom').removeClass('active');
            $('.new .view').eq(index).find('.background').removeClass('active');
            $('.new .view').eq(index).find('.background').removeClass('active');
            $('.new .view').eq(index - 1).find('.divider-bo').removeClass('active');
        };
        $scope.cl = function (index) {
            $scope.colors.forEach(function (v, i) {
                $('.item .color').eq(index).removeClass(v);
                $('.item .color').eq(index).addClass($scope.colors[index]);
                $scope.current.class = $scope.colors[index];
                console.log(index);
            });
        };
        $('.new-todo input').on('blur', function () {
            $('.new-todo .top').removeClass('active');
            $('.new-todo .background').removeClass('active');
            $('.new-todo .bottom').removeClass('active');
            var val = $(this).val();
            var max = -Infinity;
            $scope.current.todos.forEach(function (v, i) {
                if (max < v.id) {
                    max = v.id;
                }
            });
            if (val === '') {
                $('.new-todo').removeClass('active');
            } else {
                var arr = {id: max + 1, title: val, state: 0};
                $scope.current.todos.push(arr);
                $('.new-todo input').val('');
            }
        });
        $scope.bg = function () {

        };
        $(document).on('click', function () {
            $('.fixed').removeClass('active');
        });
        $scope.yes = function () {
            $('.cover').removeClass('active');
            $('.alert').removeClass('active');
            $scope.current.todos=$scope.current.todos.filter(function (v, i) {
                return v.state!==1;
            })
        };
        $scope.none = function () {
            $('.collection').toggleClass('active');
            $('.to-right').toggleClass('active');
            $('.kong').toggleClass('active');
        };
        $scope.white = function () {
            $('.search').addClass('active');
        };
        $('.white').on('blur', function () {
            $('.search').removeClass('active');
        });
        $scope.stop = function (e) {
            e.stopPropagation();
        };
        $scope.new = function () {
            $('.new-todo').addClass('active');
            $('.new-todo input').focus();
            $('.new-todo .top').addClass('active');
            $('.new-todo .background').addClass('active');
            $('.new-todo .bottom').addClass('active');
        };
        $('.clear').on('mousedown', false);
        $('.list-top .button').on('mousedown', false);
        $scope.miss = function (id) {
            $scope.lists = $scope.lists.filter(function (v, i) {
                return v.id !== id;
            });
            $scope.current = $scope.lists[0];
        };
        $scope.show = function (e) {
            e.stopPropagation();
            $('.fixed').toggleClass('active');
        }
    }]);