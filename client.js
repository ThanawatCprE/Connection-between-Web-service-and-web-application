var express = require('express');
var soap = require('soap');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
var app = express();
app.use(bodyParser.xml({
    limit:'1MB',
    xmlParseOptions:{
        normalize:true,
        normalizeTags:true,
        explicitArray:false
    }
}));
app.get('/',function(req,res){
    res.sendFile(__dirname + "/" + "/client.html");
})
app.post('/getBMI',bodyParser.urlencoded({extended:false}),function(req,res){
    console.log(req.body);
    var input = req.body;
    console.log(input.biodata.weight);
    console.log(input.biodata.height);

    var url = "http://127.0.0.1:5000/soap/someservice?wsdl";
    var args = {w: input.biodata.weight,h: input.biodata.height};
    soap.createClient(url,function(err,client){
        if(err)
            console.error(err);
        else {
            client.echo(args,function(err,response){
                if(err)
                    console.error(err);
                else{
                    console.log(response);
                    res.send(response);
                }
            })
        }
    });
})
var server = app.listen(3036,function(){
    var host = "127.0.0.1";
    var port = server.address().port;
    console.log("server running at http://%s:%s\n",host,port);
})