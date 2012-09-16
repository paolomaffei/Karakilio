

function getLyricsToSend(id){
    var url = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=8199f8199755eeaca66a70ce0263110e&track_id="
    + id + "&format=jsonp&callback=rr";
	url = encodeURI(url);
	$.ajax({
           url : url,
           dataType : "jsonp",
           success : function(data, textStatus, jqXHR) {
           if (data != null) {
           
           $("#lyricsM").empty();
           $("#lyricsM").append('<div><p>');
           
           $("#lyricsM").append(data.message.body.lyrics.lyrics_body);
           console.log(data.message.body.lyrics.lyrics_body);
           $("#lyricsM").append('</div>');
           sendLyrics();
           } else {
           alert("data null");
           
           }
           
           },
           error : function(jqXHR, textStatus, errorThrown) {
           alert('login error: ' + textStatus);
           }
           });
    
}


function sendLyrics(){
    
}
