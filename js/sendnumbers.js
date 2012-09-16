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
     		showLyrics();
		},

		error: function(jqXHR, textStatus, errorThrown){
			alert("couldn't send numbers: " + textStatus);
		}
	});
}



function showLyrics() {
	
}

//POST http://karakilio.herokuapp.com/api/twilio/conference
//p=2243243243&p=3432432443&p=4343243&p=&p=&p=&p=&p=&p=&p=