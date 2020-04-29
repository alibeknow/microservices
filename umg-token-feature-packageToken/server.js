var express = require('express');
var app = express();

var func = require("./index");

let config={
    dbName : 'inpdb', 
    dbUser : 'in_user',
    dbPass : 'owndev$pass', 
    dbHost : '10.15.123.177',
    dbDialect : 'postgres',
    createTable: false
};

let obj= func(config); //передает config(подключ к базе создает models)  возвращает crud operations и записывает в перемен. obj
let {TokenService} = obj; 

let data; //= {msisdn : '42194', token : 'tokennew' , id: 'df09be5e-193e-4353-bbba-d3bdf00e929d'};
let limit; // = 10 максимальное колчество  записей (rownum <11)
let offset; // = 1; // начальный индексюесли9 берет c 9 элемента

app.get('/', async function (req, res) {
    let myProm = await TokenService.Get(data,  limit, offset ); // если значения не заданы берет по ум все данные
    res.send(myProm);
});

/*
//getbyid  + checked
app.get('/:uid', async function (req, res) {
    let myProm = await TokenService.GetById(req.params.uid);
    res.send(myProm);
});

//getbymsisdn + checked
app.get('/phone/:msisdn', async function (req, res) {
    let myProm = await TokenService.GetByMsisdn(req.params.msisdn);
    res.send(myProm);
});


//create + checked
let TokenModel = {status: "ok", msisdn: '4219', token: 'token'};
app.post('/', async function (req, res) {
    let myProm = await TokenService.Save(TokenModel);
    console.log(myProm);
    res.send(myProm);
});

//update + checked
app.put('/:uid', async function (req, res) {
    let TokenModel = {uid:  req.params.uid, status: "stateupdated", msisdn: '42194', token: 'tokennew'};
    let myProm = await TokenService.Update(TokenModel);
    res.send(myProm);
});

//delete +checked
app.delete('/:uid', async function (req, res) {
    let myProm = await TokenService.Delete(req.params.uid);
    res.send(myProm);
});
*/

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}); 

