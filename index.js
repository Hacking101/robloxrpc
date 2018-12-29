#!/usr/bin/env node
//ROBLOX RPC
//Made by Hacking101 @ V3rm
//Unverified#6899 on Discord
var http = require('http'),
    url = require('url');
    client = "";
function SetGame(dscid) {
		console.log("A new game has been set.");
		if (client != "") {
			client.disconnect();
		};
		client = require('discord-rich-presence')(String(dscid));

};

//Timeout function to disconnect RPC
var boi = 0;
function tcheck() {
    var old = boi;
    setTimeout(function () {
        if (old == boi) {
			SetGame("0");
        }
    }, 18000);
}

function Change(tab) {
	var send = {}
	for (x in tab) {
		if ((tab[x] != "undefined") && (tab[x] != "")) {
			if ((x == "startTimestamp") || (x == "endTimestamp")) {
				send[x] = Number(tab[x]);
			} else {
				send[x] = tab[x];
			};
		};
	};
	/*for (x in send) {
		console.log(x + " " + send[x]); //for debugging what network receives
	};*/
	client.updatePresence(send);
};

http.createServer(function (req, res) {
	res.end("OK");
	boi++;
	tcheck();
    var query = url.parse(req.url,true).query;
	if (query.gameselect) {
		SetGame(query.gameselect);
	} else {
		Change({details:query.details,state:query.state,startTimestamp:query.starttimestamp,endTimestamp:query.endtimestamp,largeImageKey:query.largeimagekey,largeImageText:query.largeimagetext,smallImageKey:query.smallimagekey,smallImageText:query.smallimagetext}); //whew
		};
}).listen(3333);
