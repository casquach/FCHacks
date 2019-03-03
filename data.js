<!DOCTYPE html>
<html>
  <head>
    <title>Simple Data</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <script src="https://env-132697.customer.cloud.microstrategy.com/MicroStrategyLibrary/javascript/embeddinglib.js"></script>

  </head>

  <body>
    <div class="container">
        <div class="page-header">
            <h1>Simple Embedding Sample</h1>
        </div>
    </div>
    <div id="dossierContainer1" style="width: 100%; height: 50%;"></div>
</body>

<!-- Replace path to point to the embeddingLib in your environment -->
<script src="https://env-73627.customer.cloud.microstrategy.com/MicroStrategyLibrary/javascript/embeddinglib.js"></script>;
<script>
    //BEGIN CONFIG PARAMETERS -------------------------------------------------------------------------
    baseRestURL = "https://env-73627.customer.cloud.microstrategy.com/MicroStrategyLibrary"";
    username = "steve";
    password = "";
    projectID = "B7CA92F04B9FAE8D941C3E9B7E0CD754";
    dossierID = "C7B28AFD11E7BA8700000080AFD1969F";
    //END CONFIG PARAMETERS -------------------------------------------------------------------------



    //Form PostData for login REST request
    var postData = {};
    postData.username = username;
    postData.password = password;
    postData.loginMode = 1;


    var projectUrl = baseRestURL + '/app/' + projectID;
    var dossierUrl = projectUrl + '/' + dossierID;
    console.log("DossierURL: " + dossierUrl);

    //populate div with Dossier:
    microstrategy.dossier.create({
        placeholder: document.getElementById("dossierContainer1"),
        url: dossierUrl,
        enableCustomAuthentication: true,
        enableResponsive: false,
        containerWidth: 400,
        containerHeight: 400,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: function() {
            return getXHRRequestPromise(baseRestURL + '/api/auth/login', postData, 'POST', 'application/json', 'x-mstr-authToken').then(function(authToken) {
                return authToken;
            })
        }
    }).then(function(dossier) {
        //any code you want to run after dossier loads
    });



    function getXHRRequestPromise(url, body, method, contentType, desiredHeader) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(body));

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 2) {
                    resolve(xhr.getResponseHeader(desiredHeader));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
        });
    };
</script>



</html>
