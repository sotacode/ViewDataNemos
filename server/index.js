var express = require('express');
const fs = require("fs");
const cors = require("cors");

const symbols = JSON.parse(fs.readFileSync("symbols.json"));
const historical = JSON.parse(fs.readFileSync("historical.json"));

var app = express()  
app.use(cors())
var port = process.env.PORT || 9090



app.get('/api/symbols/', function(req, res) {
  res.send(symbols.symbolsList); 
})

app.get('/api/symbols/:symbol', function(req, res) {
  filtered = symbols.symbolsList.filter((symbol)=> symbol.symbol === req.params.symbol)[0]
  res.json(filtered)  
})

app.get('/api/historical/', function(req, res) {
  res.json(historical.historicalStockList)   
})

app.get('/api/historical/:symbol', function(req, res) {
  filtered = historical.historicalStockList.filter( (historical) => historical.symbol === req.params.symbol )[0];
  res.send( filtered != undefined ? filtered.historical : 200 );
})

app.listen(port, function(){
  console.log('API listen on port ' + port)
})
