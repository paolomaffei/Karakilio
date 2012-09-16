
function searchKaraokeSongs() {
	var name = $("#songName").val();
	name = name + " karaoke version";
	var sp = getSpotifyApi(1);
	models = sp.require("sp://import/scripts/api/models");

	var search = new models.Search(name);
	search.localResults = models.LOCALSEARCHRESULTS.APPEND;

	search.observe(models.EVENT.CHANGE, function() {
		var results = search.tracks;
		var arrayClasses = new Array();
		arrayClasses[0] = 'button medium blue';
		arrayClasses[1] = 'button medium green';
		arrayClasses[2] = 'button medium orange';
		arrayClasses[3] = 'button medium gray';
		for (i = 0; i < 5; i++) {
			uri = "'" + results[i].uri + "'";

			if (i == 4) {
				$("#spotifyResults").append(
						'<a onclick="getLyrics(' + uri
								+ ')" style="margin:5px" href="#" class="'
								+ arrayClasses[0] + '">' + results[i].name
								+ '</a>');

			} else {
				$("#spotifyResults").append(
						'<a onclick="getLyrics(' + uri
								+ ')" style="margin:5px" href="#" class="'
								+ arrayClasses[i] + '">' + results[i].name
								+ '</a>');
			}

		}
	});

	search.appendNext();
   

}

var actualTrack = "";

function getLyrics(uri) {

	var title = $("#songName").val()
	title = encodeURI(title);
	var url_search = "http://api.musixmatch.com/ws/1.1/track.search?apikey=8199f8199755eeaca66a70ce0263110e&q_track="
			+ title + "&f_has_lyrics=1&format=json";

	$.ajax({
		url : url_search,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			if (data != null) {
var subtitle=data.message.body.track_list[0].track.has_subtitles;
           var i=0;
           while(subtitle==0 && typeof(data.message.body.track_list[i])!= 'undefined'){
           i++;
           if(typeof(data.message.body.track_list[i])!= 'undefined'){
           subtitle=data.message.body.track_list[i].track.has_subtitles;
           }}
           if(subtitle!=0){
				var id = data.message.body.track_list[i].track.track_id;
				console.log(id);
				fillMusixMatch(id);
           }
           
           }
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('login error: ' + textStatus);
		}
	});
    
     showPlayers();

}


function getLyricsTest(title) {
    
	//var title = $("#songName").val()
	title = encodeURI(title);
	var url_search = "http://api.musixmatch.com/ws/1.1/track.search?apikey=8199f8199755eeaca66a70ce0263110e&q_track="
    + title + "&f_has_lyrics=1&format=jsonp&callback=rr";
    
	$.ajax({
           url : url_search,
           dataType : "jsonp",
           success : function(data, textStatus, jqXHR) {
           if (data != null) {
           
           var id = data.message.body.track_list[0].track.track_id;
           console.log(id);
           fillMusixMatch(id);
          
           }
           },
           error : function(jqXHR, textStatus, errorThrown) {
           alert('login error: ' + textStatus);
           }
           });
    
}



function fillMusixMatch(id) {

	var url = "http://api.musixmatch.com/ws/1.1/track.subtitle.get?apikey=8199f8199755eeaca66a70ce0263110e&track_id="
			+ id + "&format=jsonp&callback=rr";
	url = encodeURI(url);
	$.ajax({
		url : url,
		dataType : "jsonp",
		success : function(data, textStatus, jqXHR) {
			if (data != null) {

				$("#lyricsMTest").empty();
				$("#lyricsMTest").append('<div><p>');
           var lyrics=data.message.body.subtitle.subtitle_body;
				$("#lyricsMTest").append(lyrics);
				$("#lyricsMTest").append('</div>');
           showLyrics(lyrics, id);
			} else {
				alert("data null");

			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('login error: ' + textStatus);
		}
	});

}

function convert(input) {
    var parts = input.split(':'),
        minutes = +parts[0],
        seconds = +parts[1];
    return (minutes * 60 + seconds).toFixed(3);
}

function lyricsToKRL(timings2) {
	console.log(timings2);
	var split2 = timings2.split(/\r\n|\r|\n/);
	var max = parseInt(split2.length);
	var arr = [];
	for (i in split2) {
		var line = parseInt(i);
		var lineArr = [];
		// push [start, end, [[0, "lyric line"]]]
		var splitLine = split2[line].split(/\]/);
		var time = parseFloat(convert(splitLine[0].substring(1)));
		// push the start time
		lineArr.push(time);
		// push the end time
		if (line+1 == max) {
			lineArr.push(time+10); // assume the last line is 10 seconds long
		} else {
			lineArr.push(parseFloat(convert(split2[line+1].split(/\]/)[0].substring(1))));
	}
		var lyricArray = [[0, splitLine[1]]];
		// push the lyric
		lineArr.push(lyricArray);
		arr.push(lineArr);
	}

	var timings = RiceKaraoke.simpleTimingToTiming(arr);
	return timings;
}

function showLyrics(lyricsData) {
    var timings = lyricsToKRL(lyricsData);
	var numDisplayLines = 2;
	var karaoke = new RiceKaraoke(timings);
	var renderer = new SimpleKaraokeDisplayEngine('karaoke-display',
			numDisplayLines);
	var show = karaoke.createShow(renderer, numDisplayLines);

	// This is a sound-less demo
	var i = 0.0;
	var limit = 65.0;
	var rate = .05;
	var interval;
	interval = setInterval(function() {
		if (i > limit) {
			clearInterval(interval);
		}
		i += rate;
		show.render(i);
	}, rate * 1000);
    
    
}

function showPlayers() {
    
	$("#selectSong").hide();
	$("#players").show();
   
}


function sendLyrics(){
    
    numbers=document.getElementsByName("p").value;
    array=arrayLyrics;
    
    for(i=0;i<numbers.length;i++){
        var url = "https://api.twilio.com/2010-04-01/Accounts/AC7fc1058f5d6115b080ffe253adea3f14/SMS/Messages.json";
        url = encodeURI(url);
        body="";
        for(j=0;j<array.length; j++){
            if(j>(i-1) && j<i+3){
                upp=array[i].toUpperCase();
                body=body+upp+"</n>";
            }else{
                body=body+array[i]+"</n>";
            }
            
        }
        
        var dataS="From=+442033223006&To="+numbers[i]+"&Body="+body;
        $.ajax({
               url : url,
               dataS: data,
               type : 'POST',
               success : function(data, textStatus, jqXHR) {
               
               console.log("sended");
               
               },
               error : function(jqXHR, textStatus, errorThrown) {
               alert('login error: ' + textStatus);
               }
               });
        
    }
    
    
    
    
    
    
    
}
