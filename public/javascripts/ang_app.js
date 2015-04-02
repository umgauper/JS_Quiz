var app = angular.module('ang_app', [])
    .controller('quizController', ['$scope', '$http', function($scope, $http) {

        $http.get('https://api.mongolab.com/api/1/databases/quiz_question_sets/collections/questionSets?apiKey=iMg3sLxSc8OjLTCX7C3f_bEQse5TL74o').success(function(data) {
            $scope.questionSets = data
        });

        var answers = {};

        $scope.i = 0;   //TODO: maybe? on score page show chosen answer and correct answers?



        function updateAnswers() {
            answers[$scope.i] = $('input:checked').val();
        }

        function loadStoredAnswer() {
            $('input:checked').prop('checked', false);
            if(answers[$scope.i]) { // If there is a value for the current answer,

                var ans = answers[$scope.i];
                var radio = "input[value='" + ans + "']";
                $(radio).prop('checked', true); //check the corresponding radio button.
            }
        }

        $scope.calculateScore = function() {
            $scope.score = 0;
            var userAnswers = [];
            for(var answer in answers) {
                userAnswers.push(answers[answer]);
            }

            for(var j=0; j<$scope.questionSets.length; j++) {
                if( userAnswers[j] == $scope.questionSets[j].correctAnswer) {
                    $scope.score++;
                }
            }
            alert($scope.score);
       };


        $scope.next = function() {

            if ( $('input:checked').val() ) {
                updateAnswers();
                if($scope.i < $scope.questionSets.length) {
                    $scope.i++;
                    loadStoredAnswer();
                }

            } else {
                $('#error').show();
            }
        };

        $scope.prev = function() {

            if($scope.i > 0) {
                $scope.i--;
                loadStoredAnswer();
            }
        };

    }]);
//try putting data into a separate route, that sends JSON data when there's a get request...see last answer here: http://stackoverflow.com/questions/15009664/accessing-get-variable-in-angular-function