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
    
  ConnectButton.addEventListener("click",HueDiscover);

// ekstra comment

 function HueDiscover(){
 Hue.Discover({
          success:function(bridges){
                
                var Bridge = Hue.Bridge(bridges[0].internalipaddress);
                var User = Bridge.User(Ti.Platform.id);
              
                User.Create({
                  devicetype:"test user",
                  success:function(response){
                
                  ConnectButton.title="CONNECTED";
                  ConnectButton.backgroundColor = "#009900";
                  ConnectButton.removeEventListener('click',HueDiscover);
                  
                  
                  var ButtonOn = Ti.UI.createButton({
                      title:"Turn on all lights",
                      width:130,
                      left:20,
                      height:60,
                      bottom:200,
                      color:"#333",
                      backgroundColor:"#fff",
                      borderColor:"#000",
                      borderRadius:3
                  }); 
                  
                  var ButtonOff = Ti.UI.createButton({
                      title:"Turn off all lights",
                      width:130,
                      right:20,
                      height:60,
                      bottom:200,
                      color:"#333",
                      backgroundColor:"#fff",
                      borderColor:"#000",
                      borderRadius:3
                  }); 
                  
                  
                  win.add(ButtonOn);
                  win.add(ButtonOff);
                  
                  ButtonOn.addEventListener("click",function(){
                      Ti.API.log("ON");
                      User.SetGroupState({
                          id:0,
                          body:{
                              on:true
                          },
                          success:function(response){},
                          error:function(response){}
                      });
                      
                  });
                  
                  ButtonOff.addEventListener("click",function(){
                      Ti.API.log("OFF");
                      User.SetGroupState({
                          id:0,
                          body:{
                              on:false
                          },
                          success:function(response){},
                          error:function(response){}
                      });
                      
                  });
                  

                      
                  },
                  error:function(response){
                        alert(JSON.stringify(response));
                  }
                });

          }
      });     
 };  

 win.add(TextLabel);
 win.add(ConnectButton);
 win.open();

})();


 