/**
 * Websms.lk SMS Client 
 * Version : JavaScript - V1
 * Copyright @ 2017 - 2020 websms.lk
 * Customer Service : +94-(0)11-4348585
 * Email : support@websms.lk
 */
function WebSMSLK(options){
    'use strict';
    var defaults = {
        apikey: '',
        apitoken: '',
        senderName: "DEMO_SMS",
        msgType:"sms",
        country_code: "94",
        language:"",
        route:0,
        file:"",
        scheduledate:"",
        duration:"",
        webSMSurl:'https://app.newsletters.lk/smsAPI?',
    }
    var extend = function ( defaults, options ) {
        for ( var key in options ) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                defaults[key] = options[key];
            }
        }
        return defaults;
    };
    extend(defaults,options);
     function SendSMS (number,text) {
        if(number !=""){
            if(text !=""){ 
                var number_array=number.split("");
                if(number_array[0]=="+"){
                    number_array=number_array.shift();
                    number=number_array.join();
                }else{
                    if(number_array[0]=="0"){
                        number_array=number_array.slice(1);
                        number=defaults.country_code+number_array.join("");
                    } 
                } 
                var param='sendsms&apikey='+defaults.apikey+'&apitoken='+defaults.apitoken+'&from='+defaults.senderName+'&to='+number+'&type='+defaults.msgType;if(defaults.route != 0) { param=+'&route='.defaults.route};
                 if(defaults.msgType=="sms" || defaults.msgType=="unicode"){
                    //SMS
                   param=param+'&text='+text;
                }else if(defaults.msgType=="voice" || defaults.msgType=="mms"){
                    //Voice And MMS
                    if(defaults.file){
                        param=param+'&text='+$TEXT+'&file='+defaults.file;
                        if(defaults.msgType=="voice" && defaults.duration !=""){
                            param=param+'&duration='+defaults.duration;
                        }
                    }else{
                        return msgs.MMSFileMissing;
                    }
                }else if(defaults.msgType=="whatsapp"){
                    //WhatsAPP
                    param=param+'&text='+$TEXT;
                    if(defaults.file){
                        param=param+'&file='+defaults.file;
                    }
                }else if(defaults.msgType=="flash"){
                    //Flash
                    param=param+'&text='+$TEXT;
                    if(defaults.file){
                        param=param+'&file='+defaults.file;
                    }
                } 
                if(defaults.scheduledate != ""){
                    param=param+'&scheduledate='+defaults.scheduledate;
                }
                if(defaults.language != ""){
                    param=param+'&language='+defaults.language;
                } 
                const Http = new XMLHttpRequest();
                const url=defaults.webSMSurl+param;
                Http.open("POST", url);
                Http.send();
                Http.onreadystatechange = (e) => {
                    return_respond(Http.responseText);
                    return {status:1,respond:Http.responseText};
                }
            }else{
                return {status:0,msg:"Empty Messeges"};
            }
        }else{
            return {status:0,msg:"Invalid mobile number"};
        }
    };
    function return_respond(res){
        return {status:1,respond:res};
    }
    return {
        SendSMS: SendSMS
    };
}
