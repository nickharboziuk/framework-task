var app = angular.module('app', []);

const BACK_END_API_ENDPOINT = 'http://localhost:3001/api';

app.controller('GameController', function ($scope, GameService) {
  $scope.submitEntry = function () {
    if (typeof $scope.name === 'undefined' || typeof $scope.word === 'undefined') {
      return;
    }
    var entry = {
      name: $scope.name,
      word: $scope.word,
    };
    GameService.submitEntry(entry).success(function (_points) {
      $scope.word = undefined;
      GameService.getScores().success(function (scores) {
        $scope.scores = scores;
      });
    });
  };

  GameService.getScores().success(function (scores) {
    $scope.scores = scores;
  });
});

app.service('GameService', function ($http) {
  this.getScores = function () {
    return $http.get(`${BACK_END_API_ENDPOINT}/scores`);
  };
  this.submitEntry = function (entry) {
    return $http.post(`${BACK_END_API_ENDPOINT}/words`, entry);
  };
});
