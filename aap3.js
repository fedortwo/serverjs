const fetch = require('node-fetch')
const delay = require('delay')

var body = {}
var x = {}

const replace = require('replace')
body = { query: 'customEvents | where name like \'SynchronizationForItemFailure\' | where customDimensions.common_org_alias == \'domketering\' | distinct  tostring(parse_json(tostring(parse_json(tostring(customDimensions.target)).fiscal_document)).guid), tostring(parse_json(tostring(parse_json(tostring(customDimensions.target)).total_sum)).value), tostring(parse_json(tostring(parse_json(tostring(customDimensions.target)).sum_by_cash)).value), tostring(parse_json(tostring(parse_json(tostring(customDimensions.target)).sum_by_card)).value)'}
var fetch2 = require('node-fetch')
fetch('https://api.applicationinsights.io/v1/apps/12daf962-b9c0-4733-913b-967bc7196c94/query?timespan=PT1H',
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
    .then(x => {
        console.log(JSON.stringify(x.tables[0].rows))
        var size = Object.keys(x.tables[0].rows).length
        console.log(size)
        var fds = []
        for (let i = 0; i < size; i++) {
            fds[i] = (x.tables[0].rows[i])

        }


        //var result = JSON.stringify(fds).split(/[^a-zа-яё\s]/gi).join(' ');
        //var result2 = `'${result}'`
        

var fdssize = Object.keys(fds).length
console.log(fdssize)
for (let i = 0; i < fdssize; i++)
{
        body[i] = {
            "fiscal_form": "Receipt",
            "fiscal_drive_number": "9999999999999999",
            "number": i + 1,
            "issued_at": "2020-12-01T12:05:51Z",
            "fiscal_registrar": {
                "guid": "c0d318f8-46fb-405e-9fd7-85babc3ec363",
            },
            "sources": {
                "fiscal_document_name": "Кассовый чек",
                "fiscal_document_form": "Receipt",
                "customer_name": "",
                "customer_inn": "",
                "receipt_number": i + 1,
                "shift_number": 1,
                "positions": [],
                "total_sum": fds[i][1],
                "sum_by_cash": fds[i][2],
                "sum_by_card": fds[i][3],
                "sum_by_prepayment": 0,
                "sum_by_postpayment": 0,
                "sum_by_considerations": 0,
                "sum_of_vat_1102": 0,
                "sum_of_vat_1103": 0,
                "sum_of_vat_1104": 0,
                "sum_of_vat_1105": 0,
                "sum_of_vat_1106": 0,
                "sum_of_vat_1107": 0,
                "receipt_sender_email": "no-reply@ofd.yandex.ru",
                "fiscal_document_format": "Version2",
                "organization_name": "ИП Ковалева Ольга Вячеславовна",
                "organization_inn": "7729724371",
                "issued_at": "2020-12-01T12:12:51Z",
                "fiscal_registrar_registration_number": "9999999999999999",
                "cashier_name": "Чернецова Ирина",
                "cashier_inn": "",
                "settlement_address": "640026, Курганская область, г.о. город Курган, ул Коли Мяготина, д. 8",
                "settlement_location": "ТРЦ ",
                "fiscal_document_number": i,
                "fiscal_drive_number": "9999999999999999",
                "fiscal_sign": 999,

            },
           
            "guid": fds[i][0]
        }

    }
var bodysize = Object.keys(body).length
        
    

        for (i = 0; i < 1; i++)
{


    async function() {
 var newfetch =  fetch('https://api-dev.life-pos.ru/v2/orgs/603f1fd4-850d-47e0-bf75-1c59f45d73e3/fiscal-registrars/c0d318f8-46fb-405e-9fd7-85babc3ec363/docs/receipts',
    {
            method: 'post',
            body: JSON.stringify(body[0]),
    
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '95CwcMPrc3wkxAt5Aryayf7df4g3qnrbaHhvRtFJ4TbZ'
            }
        })
      

     delay(2000);
console.log(JSON.stringify(newfetch.response.json))

}


    })




    /*    fetch('https://api-dev.life-pos.ru/v2/orgs/603f1fd4-850d-47e0-bf75-1c59f45d73e3/fiscal-registrars/c0d318f8-46fb-405e-9fd7-85babc3ec363/docs/receipts',
{
        method: 'post',
        body: JSON.stringify(body),

        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'gv1kimq4kfma3usnan2exuc6nwhhxxbmjpji5x18'
        }
    })
   */



