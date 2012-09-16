
function sendNumbers() {
	numbers=document.getElementsByName("p");
   
	alert(numbers);
	var listP="p="+numbers[0].value;
	
	for(i=1;i<numbers.length;i++) {
	
		listP+="&p="+numbers[i].value;
		
	}
	
	var url="http://karakilio.herokuapp.com/api/twilio/conference";
	
	url=encodeURI(url);

	$.ajax({
		type: 'POST',
		url: url,
		data: listP,
		//dataType: "jsonp",
		success: function(data, textStatus, jqXHR){

     		sendLyrics();

		},

		error: function(jqXHR, textStatus, errorThrown){
			alert("couldn't send numbers: " + textStatus);
		}
	});
}



function retrieveSongURL() {
	var url="http://karakilio.herokuapp.com/api/twilio/recordings";
	
	url=encodeURI(url);

	$.ajax({
		url: url,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
     		var last = data.length-1;
     		var songURL = data[last].recordingData.RecordingUrl;
           //showStream(songURL);
		},

		error: function(jqXHR, textStatus, errorThrown){
			alert("couldn't send numbers: " + textStatus);
		}
	});
}
