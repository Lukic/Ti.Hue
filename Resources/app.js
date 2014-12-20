(function() {

  var TiHue = require("/lib/Ti.Hue");
  var Hue = new TiHue.Hue();    
    
  var win = Ti.UI.createWindow({
      backgroundColor:"#333"
  }); 
  
  var TextLabel = Ti.UI.createLabel({
      text:"1) Go and press the button on the bridge and then press the CONNECT button and you should get a success response.",
      top:60,
      left:20,
      right:20,
      color:"#fff"
  });
  
  
  var ConnectButton = Ti.UI.createButton({
      title:"CONNECT",
      left:20,
      right:20,
      height:60,
      bottom:100,
      color:"#333",
      backgroundColor:"#fff",
      borderColor:"#000",
      borderRadius:3
  });
    
  ConnectButton.addEventListener("click",function(){
  
      Hue.Discover({
          success:function(bridges){
                
                var Bridge = Hue.Bridge(bridges[0].internalipaddress);
                var User = Bridge.User(Ti.Platform.id);
              
                User.Create({
                  devicetype:"test user",
                  success:function(response){
                
                  ConnectButton.title="CONNECTED";
                  ConnectButton.backgroundColor = "#009900";
                  
                      User.SetLightState({
                          id:4,
                          body:{
                              on:false
                          },
                          success:function(response){},
                          error:function(response){}
                      });
                      
                  },
                  error:function(response){
                        alert(JSON.stringify(response));
                  }
                });

          }
      });
      
  });
  

 win.add(TextLabel);
 win.add(ConnectButton);
 win.open();

})();


 