
var ontime = require('ontime')
ontime({
    cycle: ['20:11:00', '9:00:00']
}, function (ot) {
    var body = {}
    var x = {}
    const utf8 = require('utf8')
    body = {
        query: 'customEvents | where name like \'SynchronizationForItemFailure\' | where customDimensions.errorCode != "DUPLICATE" | where customDimensions.errorCode != \'NOT_UNIQUE\'| where customDimensions.errorCode != \'UNKNOWN_ERROR\' | where customDimensions.common_org_alias !contains \'@tester2\'| where customDimensions.common_org_alias !contains \'evry\'| where customDimensions.common_org_alias !contains \'tastypizza\'| where tostring(customDimensions.common_org_alias) !contains \'tester\'| where customDimensions.common_org_alias !contains \'belyjantonanatolevic\'| where customDimensions.common_org_alias !contains \'spp\'| where customDimensions.common_org_alias !contains \'mircvetov\'| where customDimensions.errorCode != \'DUPLICATE\'| where customDimensions.errorCode != \'NOT_UNIQUE\'| where customDimensions.errorCode != \'UNKNOWN_ERROR\'|distinct tostring(customDimensions.common_org_alias)  '
    };
    const fetch = require('node-fetch')
    fetch('https://api.applicationinsights.io/v1/apps/12daf962-b9c0-4733-913b-967bc7196c94/query?timespan=PT3H',
        {
            method: 'post',
            body: JSON.stringify(body),

            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '*'
            }
        })
        .then(res => { return res.json() })
        .then(resBody => { x = resBody; return x })
        .then(json => {
            console.log(JSON.stringify(x.tables[0].rows))
            var size = Object.keys(x.tables[0].rows).length
            console.log(size)
            for (let i = 0; i < size; i++) {
                var orgs = x.tables[0].rows[i]
            }
            console.log(orgs)
            var slacktext = JSON.stringify(x.tables[0].rows)
            console.log(slacktext)


            var result = JSON.stringify(slacktext).split(/[^a-zа-яё\s]/gi).join(' ');


            var slackbody = { 'text': "Ошибки синхронизации у организаций: \n" + result }
            console.log(slackbody)
            fetch('https://hooks.slack.com/services/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',
                {

                    method: 'post',
                    body: JSON.stringify(slackbody)
                })


        })


    ot.done()
    return
})

