$.fn.revolver=function(t){var e,n,s,i,o,a,l,h=this,g=$(this),r={year:0,month:0,day:0,daysDel:"days+",hourDel:":",minDel:":",secDel:"",terminationMessage:"Finish"},m=!1;h.settings={},h.init=function(){h.settings=$.extend({},r,t),h.settings.month=h.settings.month-1,e=new Date(h.settings.year,h.settings.month,h.settings.day),tick(),window.setInterval("tick()",1e3)},tick=function(){n=new Date,s=e-n,i=Math.floor(s/864e5),o=Math.floor(s%864e5/36e5),a=Math.floor(s%864e5/6e4)%60,l=Math.floor(s%864e5/1e3)%60%60,o<10&&(o="0"+o),a<10&&(a="0"+a),l<10&&(l="0"+l),s>0&&(m=!0),m?g.html(i+h.settings.daysDel+o+h.settings.hourDel+a+h.settings.minDel+l+h.settings.secDel):g.html(h.settings.terminationMessage)},h.init()};