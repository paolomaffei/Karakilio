function sendLyrics(array){
    
    numbers=document.getElementsByName("p").value;
    
    
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
