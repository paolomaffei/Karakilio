
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
    + title + "&f_has_subtitles=1&format=jsonp&callback=rr";
    
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
           var lyricsArray=lyrics.split("[");
           alert(lyricsArray[1]);
				$("#lyricsMTest").append(data.message.body.subtitle.subtitle_body);
				$("#lyricsMTest").append('</div>');
           showLyrics(lyricsArray);
			} else {
				alert("data null");

			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('login error: ' + textStatus);
		}
	});

}

function showLyrics(lyricsData) {
    
    var krly='[';
  
    line=lyricsData[1];
    var time=lyricsData[1].split("]");
    var timeAr=time[0].split(':');
    min=timeAr[0];
    var secs=timeAr[1].split('.');
    
    sec=parseInt(secs[0])+parseInt(min*60);
  
    var startTime=''+sec+'.'+secs[1];
    
    
    var time2=lyricsData[2].split("]");
    var timeAr2=time2[0].split(':');
    min2=timeAr2[0];
    var secs2=timeAr2[1].split('.');
    
    sec2=parseInt(secs2[0])+parseInt(min2*60);
    
    var startTimeNext=''+sec2+'.'+secs2[1];
    var i=2;
    line=lyricsData[2];
    krly=' ['+ startTime+' , '+startTimeNext +', [ [ 0, '+time[1]+' ] ] ]';
 while(typeof(line) != 'undefined'){
     
     var time=line.split("]");
     var timeAr=time[0].split(':');
     min=timeAr[0];
     var secs=timeAr[1].split('.');
     
     sec=parseInt(secs[0])+parseInt(min*60);
     
     var startTime=''+sec+'.'+secs[1];
     if(typeof(lyricsData[i+1])!='undefined'){
     
     var time2=lyricsData[i+1].split("]");
     var timeAr2=time2[0].split(':');
     min2=timeAr2[0];
     var secs2=timeAr2[1].split('.');
     
     sec2=parseInt(secs2[0])+parseInt(min2*60);
     
         var startTimeNext=''+sec2+'.'+secs2[1];}
     else{
         sec=sec+3;
         var startTimeNext=''+sec+'.'+secs[1];
     }
      krly=krly+', ['+ startTime +', '+startTimeNext +', [ [ 0, '+time[1]+' ] ]]';
     i++;
     line=lyricsData[i];
    }
    krly=krly+']';
    //alert(krly);
    krlyO= [ krly ];
    
    console.log(krlyO);
	var numDisplayLines = 2;
	var timings = RiceKaraoke.simpleTimingToTiming(krlyO); // Simple KRL -> KRL
    //[ [ 1.35, 3.07,
    //[ [ 0, "What " ], [ 0.07, "is " ], [ 0.28, "love" ] ] ] ]
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


getCompleteLyrics(){
    
}
