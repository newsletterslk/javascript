/**
 * Websms.lk SMS Client 
 * Version : JavaScript - V1
 * Copyright @ 2017 - 2020 websms.lk
 * Customer Service : +94-(0)11-4348585
 * Email : support@websms.lk
 */
(function() {
    this.WebSMSLK = function() {
        var defaults = {
            apikey: '',
            apitoken: '',
            senderName: "DEMO_SMS",
        }
        if (arguments[0] && typeof arguments[0] === "") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
                }
            }
            return source;
        }
        function SendSMS(number,text) {
            if(number !=""){
                if(text !=""){ 
                    var number_array=number.split("");
                    if(number_array[0]=="+"){
                        number_array=number_array.shift();
                        number=number_array.join();
                    }else{
                        if(number_array[0]=="0"){
                            number_array=number_array.slice(1);
                            number=settings.country_code+number_array.join("");
                        } 
                    } 
                    var param='sendsms&apikey='+settings.apikey+'&apitoken='+settings.apitoken+'&from='+settings.senderName+'&to='+number+'&type='+settings.msgType;if(settings.route != 0) { param=+'&route='.settings.route};
                     if(settings.msgType=="sms" || settings.msgType=="unicode"){
                        //SMS
                       param=param+'&text='+text;
                    }else if(settings.msgType=="voice" || settings.msgType=="mms"){
                        //Voice And MMS
                        if(settings.file){
                            param=param+'&text='+$TEXT+'&file='+settings.file;
                            if(settings.msgType=="voice" && settings.duration !=""){
                                param=param+'&duration='+settings.duration;
                            }
                        }else{
                            return msgs.MMSFileMissing;
                        }
                    }else if(settings.msgType=="whatsapp"){
                        //WhatsAPP
                        param=param+'&text='+$TEXT;
                        if(settings.file){
                            param=param+'&file='+settings.file;
                        }
                    }else if(settings.msgType=="flash"){
                        //Flash
                        param=param+'&text='+$TEXT;
                        if(settings.file){
                            param=param+'&file='+settings.file;
                        }
                    } 
                    if(settings.scheduledate != ""){
                        param=param+'&scheduledate='+settings.scheduledate;
                    }
                    if(settings.language != ""){
                        param=param+'&language='+settings.language;
                    } 
                    const Http = new XMLHttpRequest();
                    const url=settings.webSMSurl+param;
                    Http.open("POST", url);
                    Http.send();
                    Http.onreadystatechange = (e) => {
                        return {status:1,respond:Http.responseText};
                    }
                }else{
                    return {status:0,msg:"Empty Messeges"};
                }
            }else{
                return {status:0,msg:"Invalid mobile number"};
            }
        }
    }
})