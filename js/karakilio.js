




function searchKaraokeSongs(){
    var name= $("#songName").val();
    name=name+" karaoke version";
    var sp = getSpotifyApi(1);
    models = sp.require("sp://import/scripts/api/models");
    views = sp.require("sp://import/scripts/api/views");
    ui = sp.require("sp://import/scripts/ui");
    var search = new models.Search(name);
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
                   $("#spotifyResults").append('<a onclick="getLyrics('+uri+')" style="margin:5px" href="#" class="'+arrayClasses[0]+'">'+results[i].name+'</a>');
                  
                   }else{
                   $("#spotifyResults").append('<a onclick="getLyrics('+uri+')" style="margin:5px" href="#" class="'+arrayClasses[i]+'">'+results[i].name+'</a>');
                   }
                   
                   }
                   });
    
    search.appendNext();
    
}



var actualTrack="";



function getLyrics(uri){
    

   var title= $("#songName").val()
    title=encodeURI(title);
    var url_search="http://api.musixmatch.com/ws/1.1/track.search?apikey=8199f8199755eeaca66a70ce0263110e&q_track="+title+"&f_has_lyrics=1&format=json";
     
    
    $.ajax({
           url: url_search,
           dataType: "json",
           success: function(data, textStatus, jqXHR){
           if(data!=null){
           alert("data"+data);
           var id=data.message.body.track_list[0].track.track_id;
           console.log(id);
           fillMusixMatch(id);
           }
           },
           error: function(jqXHR, textStatus, errorThrown){
           alert('login error: ' + textStatus);
           }
           });   
    
}



function fillMusixMatch(id){
   
    
    
    var url="http://api.musixmatch.com/ws/1.1/track.subtitle.get?apikey=8199f8199755eeaca66a70ce0263110e&track_id="+id+"&format=jsonp&callback=rr";
    url=encodeURI(url);
    $.ajax({
           url: url,
           dataType: "jsonp",
           success: function(data, textStatus, jqXHR){
           if(data!=null){
           
           $("#lyricsM").empty();
           $("#lyricsM").append('<div><p>');
           
           $("#lyricsM").append(data.message.body.subtitle.subtitle_body);
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

