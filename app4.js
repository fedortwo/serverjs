const fetch = require('node-fetch')

async function GetAppInsights() {
    body = {
        query: 'customEvents | where name like \'SynchronizationForItemFailure\' | where customDimensions.errorCode != "DUPLICATE" | where customDimensions.errorCode != \'NOT_UNIQUE\'| where customDimensions.errorCode != \'UNKNOWN_ERROR\' | where customDimensions.common_org_alias !contains \'@tester2\'| where customDimensions.common_org_alias !contains \'evry\'| where customDimensions.common_org_alias !contains \'tastypizza\'| where tostring(customDimensions.common_org_alias) !contains \'tester\'| where customDimensions.common_org_alias !contains \'belyjantonanatolevic\'| where customDimensions.common_org_alias !contains \'domketering\'| where customDimensions.common_org_alias !contains \'mircvetov\'| where customDimensions.errorCode != \'DUPLICATE\'| where customDimensions.errorCode != \'NOT_UNIQUE\'| where customDimensions.errorCode != \'UNKNOWN_ERROR\'|distinct tostring(customDimensions.common_org_alias), tostring(customDimensions.errorCode), tostring(parse_json(tostring(parse_json(tostring(customDimensions.target)).fiscal_document)).guid), tostring(parse_json(tostring(customDimensions.target)).processed_at), tostring(parse_json(tostring(parse_json(tostring(customDimensions.source)).meta_data)).receipt_request_guid),  tostring(parse_json(tostring(parse_json(tostring(customDimensions.source)).sum_by_card)).value), tostring(parse_json(tostring(parse_json(tostring(customDimensions.source)).sum_by_cash)).value)'
    };


    var request = await fetch('https://api.applicationinsights.io/v1/apps/12daf962-b9c0-4733-913b-967bc7196c94/query?timespan=PT3H',
        {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'gv1kimq4kfma3usnan2exuc6nwhhxxbmjpji5x18'
            }
        }
    )

    var answer = await request.json();
    var slacktext = '';
    for (i = 0; i < Object.keys(answer.tables[0].rows).length; i++) {
        if (answer.tables[0].rows[i][2] != '' && answer.tables[0].rows[i][1] == 'REFERENCE_NOT_FOUND') {
            slacktext += `org: ${answer.tables[0].rows[i][0]}, error: ${answer.tables[0].rows[i][1]}, guidFD: ${answer.tables[0].rows[i][2]}, timeFD: ${answer.tables[0].rows[i][3]}, cardSumm: ${answer.tables[0].rows[i][5]}, cashSumm: ${answer.tables[0].rows[i][6]} \n`
        } else if (answer.tables[0].rows[i][4] != '' && answer.tables[0].rows[i][1] == 'REQUEST_IS_NOT_VALID') {

            slacktext += `org: ${answer.tables[0].rows[i][0]}, error: ${answer.tables[0].rows[i][1]}, Meta_Data: ${answer.tables[0].rows[i][4]}\n`
        } else {
            slacktext += `org: ${answer.tables[0].rows[i][0]}, error: ${answer.tables[0].rows[i][1]}\n`
        }


    }
    console.log(slacktext)

    var body = { text: `${slacktext}` }

    var request = await fetch('https://hooks.slack.com/services/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',
        {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    var answer = await request.text();
    console.log(answer)
}



var ontime = require('ontime')
ontime({
    cycle: ['10:00:00', '13:30:00', '17:00:00', '20:25:00']
}, function (ot) {

    GetAppInsights();
    ot.done()
    return
})