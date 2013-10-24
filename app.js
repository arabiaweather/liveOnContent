var restify = require('restify');
var clone = require('node-v8-clone').clone;
var memArray = [];
var genListArr = {};

setInterval(procList, 100*60*5);

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

function addView(req, res, next)
{
	//Add new view to array
	var newVisitArray = [];
	newVisitArray["url"] = req.params.url;
	newVisitArray["title"]=req.params.title;
	newVisitArray["img"]=req.params.img;
	newVisitArray["domain"]=req.params.domain;
	newVisitArray["nodeid"]=req.params.nodeid;
	newVisitArray["expired"]=0; 
	memArray.push(newVisitArray);
//console.log(memArray);
	res.send("ok");
}	

function procList()
{
	//Clears views that have been flagged afte 5 min timmer 

	//Replace all 0s with 1s
//console.log(memArray);
	var len = memArray.length;
	for(i=0; i<len; i++)
	{	
		if(memArray[i]["expired"]==0)
		{
			memArray[i]["expired"] = 1;
		}
		else
		{
			memArray.splice(i,1); 
			i--;
			len--;	
		}
	}


	//Generate the response List 
	genList();	
//console.log(genListArr);
}

function genList()
{
	genListArr = {};
	var memClone = clone(memArray,true);
	var resList = {};
	for(var i =0; i<memClone.length; i++) 
	{
		var item = clone(memClone[i],true);
		if(item["domain"] in resList)
		{
			if(item["nodeid"] in resList[item["domain"]])
			{
				//Add 1 
				resList[item["domain"]][item["nodeid"]].count ++; 	
			}
			else
			{
				//Create with 1 count 
				var newObjItem = {};
				newObjItem.url = item["url"];
				newObjItem.title = item["title"];
				newObjItem.img = item["img"];
				newObjItem.domain = item["domain"];
				newObjItem.count = 1; 
				resList[item["domain"]][item["nodeid"]] = newObjItem; 

			}
		}
		else
		{
			//Create the Domain and the Item we are on as well 
			var newObjItem = {};
			newObjItem.url = item["url"];
			newObjItem.title = item["title"];
			newObjItem.img = item["img"];
			newObjItem.domain = item["domain"];
			newObjItem.count = 1; 
			resList[item["domain"]] = {};
			resList[item["domain"]][item["nodeid"]] = newObjItem; 
			
		}
	}
	genListArr = clone(resList, true);
}

function getTopList(req, res, next)
{
//console.log(JSON.stringify(genListArr));
	res.send(JSON.parse(JSON.stringify(genListArr))); 
	res.end();
}



var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/at/:url/:title/:img/:domain/:nodeid', addView);
server.get('top/:domain', getTopList);

server.listen(8888888888, function() {
  console.log('%s listening at %s', server.name, server.url);
});



