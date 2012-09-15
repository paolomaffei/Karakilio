function player(nickname,number) {
	this.nickname=nickname;
	this.number=number;
}

var players = new Array(new player("Paolo","447776113065"), new player("Sara","447508427990"), new player("Juan","7702783956") );

function launchCall() {
	getToken();
}

//we cannot use server side code to get a Twilio capability
//so we call a page on a server that can execute serverside code
//another solution was to generate a life-long token once and hardcode it here, with pretty much the same security anyway...
function getToken() {
	var url="http://3mxe.localtunnel.com/api/twilio/capability";
	url=encodeURI(url);
				
	$.ajax({
		url: url,
		dataType: "jsonp",
		//more fun! Browser/Spotify security restrictions don't allow for json so we need to use jsonp...
		//does heaven exist?
		success: function(data, textStatus, jqXHR){
    		makeCall(data.token);
		},
			
		error: function(jqXHR, textStatus, errorThrown){
			alert('capability API error: ' + textStatus);
		}
			});
}

function makeCall(token) {
	alert(token)
}
