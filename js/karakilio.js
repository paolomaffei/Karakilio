var search;
var models;
var views;
var ui;




function searchKaraokeSongs(){
    var name= $("#songName").val();
    name=name+" karaoke version";
    var sp = getSpotifyApi(1);
    models = sp.require("sp://import/scripts/api/models");
    views = sp.require("sp://import/scripts/api/views");
    ui = sp.require("sp://import/scripts/ui");
    search = new models.Search(name);
    search.localResults = models.LOCALSEARCHRESULTS.APPEND;
    
    
    
    search.observe(models.EVENT.CHANGE, function() {
                   var results = search.tracks;
                   var arrayClasses=new Array();
                   arrayClasses[0]='button medium blue';
                   arrayClasses[1]='button medium green';
                   arrayClasses[2]='button medium orange';
                   arrayClasses[3]='button medium gray';
                   for(i=0;i<5;i++){
                   uri="'"+results[i].uri+"'";
                   
                   
                   if(i==4){
                   $("#spotifyResults").append('<a onclick="playersPage('+uri+')" style="margin:5px" href="#" class="'+arrayClasses[0]+'">'+results[i].name+'</a>');
                  
                   }else{
                   $("#spotifyResults").append('<a onclick="playersPage('+uri+')" style="margin:5px" href="#" class="'+arrayClasses[i]+'">'+results[i].name+'</a>');
                   }
                   
                   }
                   });
    
    search.appendNext();
    
}





function playersPage(uri){
    localStorage.actualTrack=uri;
    //$("#selectSong").hide();
    //$("#players").show();
}

function getLyrics(){
   
    var t = Track.fromURI(localStorage.actualTrack);
    var title=t.name;
    title=title.replace("[karaoke version]","");
     title=title.replace("[Karaoke Version]","");
    var url_search="http://api.musixmatch.com/ws/1.1/track.search?q_track=back%20to%20december&q_artist=taylor%20swift&f_has_lyrics=1&format=jsonp&callback=rr";
     url_search=encodeURI(url_search);
    
    $.ajax({
           url: url,
           dataType: "jsonp",
           success: function(data, textStatus, jqXHR){
           if(data!=null){
           
           var id=body.tracklist[0].track.track_id;
           fillMusixMatch(id);
           }
           },
           error: function(jqXHR, textStatus, errorThrown){
           alert('login error: ' + textStatus);
           }
           });   
    
}



function fillMusixMatch(id){
   
    
    
    var url="http://api.musixmatch.com/ws/1.1/track.subtitle.get?apikey=6c65d0497150dd473772788db6a4008c&track_id="+id+"&format=jsonp&callback=rr";
    url=encodeURI(url);
    $.ajax({
           url: url,
           dataType: "jsonp",
           success: function(data, textStatus, jqXHR){
           if(data!=null){
           
           $("#lyricsM").empty();
           $("#lyricsM").append('<div><p>');
           
           $("#lyricsM").append(data.body.subtitle.subtitle_body);
           $("#lyricsM").append('</div>');
           }
           else{
           alert("data null");
           
           }
           
           },
           error: function(jqXHR, textStatus, errorThrown){
           alert('login error: ' + textStatus);
           }
           });    
    
    
    
    
    
}

