(function() {

  var TiHue = require("/lib/Ti.Hue");
  var Hue = new TiHue.Hue();    
    
  var win = Ti.UI.createWindow({
      backgroundColor:"#333"
  }); 
  
  var TextLabel = Ti.UI.createLabel({
      text:"1) Go and press the button on the bridge and then press the CONNECT button and you should get a success response.",
      top:60,
      left:10,
      right:10,
      color:"#fff"
  });
  
  
  var ConnectButton = Ti.UI.createButton({
      title:"CONNECT",
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
    
              
              User.SetLightState({
                  id:1,
                  body:{
                      on:true
                  },
                  success:function(response){
                      Ti.API.log("success: "+ JSON.stringify(response));
                  },
                  error:function(response){
                      Ti.API.log("error: "+ JSON.stringify(response));
                  }
              });
              
          }
      });
      
  });
  

 win.add(TextLabel);
 wind.add(ConnectButton);
 win.open();

})();


 