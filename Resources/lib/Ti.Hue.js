/**
 * @author Srdjan Lukic-Bardak
 */
function Hue(){};

Hue.prototype.xhr = function(args){
    
    var body =null;
    if(args.body !== undefined){
        body = JSON.stringify(args.body);
    }

    var client = Ti.Network.createHTTPClient({
         onload : function(e) {
             var json = JSON.parse(this.responseText);
             
                 args.success(json);

         },
         onerror : function(e) {
             args.error(e.error);
         },
         timeout : 5000 
     });
     client.open(args.method, args.url); 
     client.send(body);  
};

//Data
Hue.prototype.Discover = function(args){
    this.xhr({
        method:"GET",
        url:"http://www.meethue.com/api/nupnp",
        success:function(response){
            args.success(response);
        },
        error:function(response){
            Ti.API.log("error: " + JSON.stringify(response));
        }
    });
};

Hue.prototype.Bridge = function(ip) {
    var _this = this;
    var _bridgeUrl = _sub('http://{ip}/api', { ip: ip });

    return{
        User: function(username) {
            var _userUrl = _slash(_bridgeUrl, username),
                _configUrl = _slash(_userUrl, 'config'),
                _lightsUrl = _slash(_userUrl, 'lights'),
                _groupsUrl = _slash(_userUrl, 'groups'),
                _schedulesUrl = _slash(_userUrl, 'schedules');

            var _objectUrl = function(baseUrl) {
                return function(id) {
                    return _slash(baseUrl, id);
                };
            };

            var _lightUrl = _objectUrl(_lightsUrl),
                _groupUrl = _objectUrl(_groupsUrl),
                _scheduleUrl = _objectUrl(_schedulesUrl);
                             
            return {
                 
                 /* =============================== */
                 /* User / Config API               */
                 /* =============================== */
                 Create: function(args){
                     _this.xhr({
                        method:"POST",
                        url:_bridgeUrl,
                        body:{
                         devicetype:args.devicetype,
                         username:username
                     },
                        success:function(response){
                            
                            if(response[0].success){
                                 args.success(response);
                             }else{
                                 args.error(response);
                             }

                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 DeleteUser: function(args){
                      _this.xhr({
                        method:"DELETE",
                        url:_slash(_configUrl, 'whitelist',args.username),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 GetConfig: function(args){
                      _this.xhr({
                        method:"GET",
                        url:_configUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 SetConfig: function(args){
                      _this.xhr({
                        method:"PUT",
                        url:_configUrl,
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 GetFullState: function(args){
                      _this.xhr({
                        method:"GET",
                        url:_userUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 /* =============================== */
                 /* Light API                       */
                 /* =============================== */
                 GetLight: function(args){
                      _this.xhr({
                        method:"GET",
                        url:_lightsUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 GetNewLights: function(args){
                      _this.xhr({
                        method:"GET",
                        url:_slash(_lightsUrl, 'new'),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 SearchForNewLights: function(args){
                     _this.xhr({
                        method:"POST",
                        url:_lightsUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });    
                 },
                 
                 GetLight: function(args){
                      _this.xhr({
                        method:"GET",
                        url:_slash(_lightsUrl,args.id),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 SetLightAttribute: function(args){
                      _this.xhr({
                        method:"PUT",
                        url:_slash(_lightsUrl,args.id),
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 SetLightState: function(args){
                      _this.xhr({
                        method:"PUT",
                        url:_slash(_lightsUrl,args.id,"state"),
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                 },
                 
                 /* =============================== */
                 /* Groups API                      */
                 /* =============================== */
                
                GetGroups: function(args){
                    _this.xhr({
                        method:"GET",
                        url:_groupsUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                               
                GetGroup: function(args){
                    _this.xhr({
                        method:"GET",
                        url:_slash(_groupsUrl,args.id),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                SetGroupAttributes: function(args){
                     _this.xhr({
                        method:"PUT",
                        url:_slash(_groupsUrl,args.id),
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                SetGroupState: function(args){
                    _this.xhr({
                        method:"PUT",
                        url:_slash(_groupsUrl,args.id,"action"),
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                /* =============================== */
                /* Schedules API                   */
                /* =============================== */
                
                GetSchedules: function(args){
                    _this.xhr({
                        method:"GET",
                        url:_schedulesUrl,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                CreateSchedule: function(args){
                    _this.xhr({
                        method:"POST",
                        url:_schedulesUrl,
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                GetSchedule: function(args){
                    _this.xhr({
                        method:"GET",
                        url:_slash(_schedulesUrl,args.id),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                SetSchedule: function(args){
                    _this.xhr({
                        method:"PUT",
                        url:_slash(_schedulesUrl,args.id),
                        body:args.body,
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                },
                
                DeleteSchedule: function(args){
                    _this.xhr({
                        method:"DELETE",
                        url:_slash(_schedulesUrl,args.id),
                        success:function(response){
                            args.success(response);
                        },
                        error:function(response){
                            args.error(response);
                        }
                    });
                }
            };
        }
    };
};

/* =============================== */
/* Helpers                         */
/* =============================== */

var _slash = function() {
    return Array.prototype.slice.call(arguments, 0).join('/');
};

 var _sub = function(str, data) {
    return str.replace(/\{(\w+)\}/g, function(t, k) {
        return data[k] ? data[k] : t;
    });
};


exports.Hue = Hue;
