/*
 * We use XMLHttpRequest() instead of $http so we don't have to
 * deal manually with the user proxy settings
 */
angular.module('app').factory("Issue", function($http) {
    return {
        get: function (issueID, host, port, username, password) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.open("GET", 'http://' + host + ":" + port + '/rest/api/latest/issue/' + issueID);
                xhr.setRequestHeader("Authorization", 'Basic ' + btoa(username + ':' + password));

                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve({
                            status: this.status,
                            data: angular.fromJson(xhr.response)
                        });
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        }
    }
});
