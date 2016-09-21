var http = require('http');
var options = {
    host: '10.9.10.100',
    port: 8080,
    path: '/',
    method: 'GET',
    headers:{
        'accept': '*/*',
        'content-type': "application/atom+xml",
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'nodejs rest client'
    }
};
 
function loop(count) {
    while (count > 0) {
        var req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            if(res.statusCode.valueOf() == 200){
                console.log('HEADERS: ' + JSON.stringify(res.headers));
            }
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        req.end();
        count = count - 1;

    }
}
function main(){
    var arguments = process.argv.splice(2);
    var c = arguments[0];
    console.log("Count:",c);
    var interval = 1000;
    setInterval(function(){loop(c)}, interval);
}

main();
