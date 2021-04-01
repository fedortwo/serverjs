var querystring = require('querystring');
const { post } = require('request');

const request = require('request');
request.post({
    url: 'https://api.applicationinsights.io/v1/apps/12daf962-b9c0-4733-913b-967bc7196c94/query?timespan=PT10H',

    form: { query: 'customEvents' },
    method: 'post',


    headers: {
        'x-api-key': 'gv1kimq4kfma3usnan2exuc6nwhhxxbmjpji5x18',
        'Content-Type': 'application/json; charset=UTF - 8',
        'User-Agent': 'Request-Promise'
    },

},

    (err, res, body) => {
        //console.log(res.statusCode);
        //console.log(res.headers['content-type']);
        //console.log(res.headers.method);
        //console.log(res.request.host);
        console.log(err)
        console.log(res)
        console.log(body);
        console.log(typeof (body));
        var fs = require("fs")
        fs.writeFileSync("hello.txt", body)


        console.log(toString(body))
        //var x = body.tables;
        //console.log(JSON.parse(x));
    });

