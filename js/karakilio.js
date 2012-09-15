var search;
var models;
var views;
var ui;
$(document).ready(function() {
                  // Initialize the Spotify objects
                  var sp = getSpotifyApi(1);
                  models = sp.require("sp://import/scripts/api/models");
                  views = sp.require("sp://import/scripts/api/views");
                  ui = sp.require("sp://import/scripts/ui");
                  player = models.player,
                  library = models.library,
                  tabs();
                  models.application.observe(models.EVENT.ARGUMENTSCHANGED, tabs);
                  
                  function tabs() {
                  var args = models.application.arguments;
                  console.log(args[0]);
                  $('.section').hide();
                  $('#'+args[0]).show();
                  }
                  application = models.application,
                  playerImage = new views.Player();
                  
                  
                                    
                  });



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
                   
                   
                   alert("uri:"+results[i].uri);
                   if(i==4){
                   $("#spotifyResults").append('<a onclick="return playersPage('+results[i].uri+');" style="margin:5px" href="#" class="'+arrayClasses[0]+'">'+results[i].name+'</a>');
                   alert("i:"+i);
                   }else{
                   $("#spotifyResults").append('<a onclick="return playersPage('+results[i].uri+');" style="margin:5px" href="#" class="'+arrayClasses[i]+'">'+results[i].name+'</a>');
                   }
                   
                   }
                   });
    
    search.appendNext();
    
}



function fillResults(data){
    var track=data.tracks[0];
    var i=0;
    
    
    var j=0;
    
    
    
    $("#spotifyResults").empty();
    while(((typeof(track)) != 'undefined') && (i<5)){
        var pars=""+track.name+"("+track.artists[0].name+")";
        var uri="'"+track.href+"','"+track.name+"','"+track.artists[0].name+"'";
        if(i==4){
        $("#spotifyResults").append('<a onclick="return playersPage('+uri+');" style="margin:5px" href="#" class="'+arrayClasses[0]+'">'+pars+'</a>');
        }else{
              $("#spotifyResults").append('<a onclick="return playersPage('+uri+');" style="margin:5px" href="#" class="'+arrayClasses[i]+'">'+pars+'</a>');
        }
        i++;
       
        
        
        track=data.tracks[i];
        
    }  
    
   
    
}

function playersPage(uri){
    
}
