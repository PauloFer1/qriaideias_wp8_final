var ref=null;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
$(document).bind("mobileinit", function()
{
    // Make your jQuery Mobile framework configuration changes here!                   


});
// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady2, false);

// PhoneGap is ready
//


function onDeviceReady2()
{
    //navigator.splashscreen.show();
    $.mobile.allowCrossDomainPages = true;
    $.mobile.loader.prototype.options.text = "loading";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";
    var designWidth = 640; // zoom to fit this ratio
    var designHeight = 960; // not 800 b/c top bar is 38 pixels tall
    var scaleChange = 1; // % change in scale from above #s


    var docWidth = window.outerWidth;
    var docHeight = window.outerHeight;

    if (docWidth != designWidth) {
        var scaleX = docWidth / designWidth;
        var scaleY = docHeight / designHeight;
        if (scaleX < scaleY) {
            $('body').css('zoom', scaleX);
            scaleChange = scaleX;
        } else {
            $('body').css('zoom', scaleY);
            scaleChange = scaleY;
        }
         $('body').css('height', docHeight);
    }
    checkConnection();

}


/*
function onDeviceReady2()
{
    //navigator.splashscreen.show();
    $.mobile.allowCrossDomainPages = true;
    $.mobile.loader.prototype.options.text = "loading";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";
    var designWidth = 645; // zoom to fit this ratio
    var designHeight = 960; // not 800 b/c top bar is 38 pixels tall
    var scaleChange = 1; // % change in scale from above #s
    
    
    var docWidth = window.outerWidth;
    var docHeight = window.outerHeight;
    
    
    if (docWidth != designWidth) {
        var scaleX = docWidth / designWidth;
        var scaleY = docHeight / designHeight;
        if (scaleX < scaleY) {
            //  $('body').css('zoom', scaleX);
            scaleChange = scaleX;
        } else {
            // $('body').css('zoom', scaleY);
            scaleChange = scaleY;
        }
        $('body').css('height', docHeight);
    }
    checkConnection();
}
*/ 

$(".aBack").bind('touchstart', function() {
    $(".aBack").addClass('aBackDown');
}).bind('touchend', function() {
    $(".aBack").removeClass('aBackDown');
});

/*
$(".ulList1Li").live('touchstart', function() {
    $(this).addClass('ulListBg2');
}).live('touchend', function() {
    $(this).removeClass('ulListBg2');
});

$(".ulList2Li").live('touchstart', function() {
    $(this).addClass('ulListBg2');
}).live('touchend', function() {
    $(this).removeClass('ulListBg2');
});



$(".ulList1Li").mouseover(function() {
    $(this).addClass('ulListBg2');
}).mouseout(function() {
    $(this).removeClass('ulListBg2');
});

$(".ulList2Li").mouseover(function() {
    $(this).addClass('ulListBg2');
}).mouseout(function() {
    $(this).removeClass('ulListBg2');
});
*/

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** LOGIN **************************************//
$('body').live('pageinit', function()
               {
               $('body').die('pageinit');
               
               //$('#header').hide();
               
               if (localStorage.getItem("login") !== 0)
               {
               // $.mobile.changePage("projectos.html");
               // return(false);
               }
               
               $('#btnLogin').click(function(event)
                                    {
                                    checkConnection();
                                    var user = $("#username").val();
                                    var pass = $("#password").val();
                                    var url = 'http://qriaideias.no-ip.org/logins/mobilerequest/login/' + user + '/' + CryptoJS.SHA1(pass) + '&jsoncallback=?';
                                    
                                    $.getJSON(url, function(data)
                                              {
                                              if (data['sucess'] == true)
                                              {
                                              localStorage.setItem("userId", data['userId']);
                                              localStorage.setItem("login", 1);
                                              localStorage.setItem("userType", data['userType']);
                                              $.mobile.changePage("projectos.html", {transition: "none"});
                                              }
                                              else
                                              {
                                              //$.mobile.changePage("login.html");
                                              //$('#loginFailure').show();
                                              navigator.notification.alert("Username ou password errada!", function() {
                                                                           }, "Aviso", "OK");
                                              localStorage.setItem("login", 0);
                                              }
                                              });
                                    return false;
                                    });
               });
////******************************** LOGIN **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** PROJECTOS **************************************//

//***** GET PROJECTOS

$('#page1').live('pageshow', function()
{
    checkConnection();
    $('#content').hide();
    var id = localStorage.getItem('userId');

    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getprojectos/' + id + '&jsoncallback=?';
    $.getJSON(url, function(data)
    {
        var lenght = 0;
        if (data != '')
        {
            $.each(data, function(i, item)
            {
                lenght++;
                var projId = item['id'];
                var li = '<li class="ulList1Li"><a class="projA" href="lojas.html" data-transition="none" rel=' + projId + '>' + item['nome'] + '</a></li>';
                $("#ulList1").append(li);
            });
            $("#ulList1").listview("refresh");
            $('#content').fadeIn(400);
            if (lenght == 0)
                navigator.notification.alert("Sem projectos!", function() {
                }, "", "OK");
        }
        else
        {
            navigator.notification.alert("Sem projectos!", function() {
                checkConnection();
            }, "Erro", "OK");
        }
        return(false);
    });
});

//**** LIST CLICK EVENT
$(document).on('click', '.projA', function()
{
    $.mobile.showPageLoadingMsg();
    var idProj = $(this).attr("rel");
    var nomeProjecto = $(this).html();

    localStorage.setItem("idProjecto", idProj);
    localStorage.setItem("nomeProjecto", nomeProjecto);
    $.mobile.changePage("lojas.html", {transition: "none", changeHash: true});
    return(false);
});
//******************************** PROJECTOS **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** LOJAS **************************************//
//***** GET LOJAS
$('#page2').live('pageshow', function()
{
    checkConnection();
    $('#content').hide();
    var idProjecto = localStorage.getItem('idProjecto');
    var nomeProjecto = localStorage.getItem('nomeProjecto');

    $('#proj').text(nomeProjecto);
    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getlojas/' + idProjecto + '&jsoncallback=?';
    $.getJSON(url, function(data)
    {
        var lenght = 0;
        if (data != '')
        {
            $.each(data, function(i, item)
            {
                lenght++;
                var lojaId = item['id'];
                var li = '<li class="ulList2Li"><a class="lojaA" href="loja.html" data-transition="none" rel=' + lojaId + '>' + item['nome'] + '</a></li>';
                $("#ulList2").append(li);
            });
            $("#ulList2").listview("refresh");
            $('#content').fadeIn(400);
            if (lenght == 0)
                navigator.notification.alert("Item vazio!", function() {
                }, "Aviso", "OK");
        }
        else
        {
            navigator.notification.alert("Item vazio!", function() {
                checkConnection();
            }, "Aviso", "OK");
        }
    });
});
//**** LIST CLICK EVENT
$(document).on('click', '.lojaA', function()
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    var idLoja = $(this).attr("rel");
    var nomeLoja = $(this).html();
    localStorage.setItem("idLoja", idLoja);
    localStorage.setItem("nomeLoja", nomeLoja);
    $.mobile.changePage("loja.html", {transition: "none", changeHash: true});
});
//******************************** LOJAS **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** LOJA ITEM **************************************//
$('#page3').live('pageshow', function()
{
    checkConnection();
    $('#content').hide();
    var idLoja = localStorage.getItem('idLoja');
    var idProjecto = localStorage.getItem('idProjecto');
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);
  /*
    $('#maqueteBtn').mouseover(function() {
        $("#btn_maquete").attr({src: "images/btn_maquete2.png"});
    }).mouseout(function() {
        $("#btn_maquete").attr({src: "images/btn_maquete.png"});
    });
    $('#fichaBtn').mouseover(function() {
        $("#btn_ficha").attr({src: "images/btn_ficha2.png"});
    }).delay(3).css("src","images/btn_ficha.png");
    
    $('#obsBtn').mouseover(function() {
        $("#btn_obs").attr({src: "images/btn_obs2.png"});
    }).mouseout(function() {
        $("#btn_obs").attr({src: "images/btn_obs.png"});
    });
    $('#fotosBtn').mouseover(function() {
        $("#btn_fotos").attr({src: "images/btn_fotos2.png"});
    }).mouseout(function() {
        $("#btn_fotos").attr({src: "images/btn_fotos.png"});
    });
*/
    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getprojectoloja/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
    $.getJSON(url,
            function(data) {
                if (data !== '')
                {
                    var id = data['id'];
                    var maquete = data['maquete'];
                    var ficha = data['ficha_tecnica'];
                    var obs = data['observacoes'];
                    localStorage.setItem("maquete", maquete);
                    localStorage.setItem("ficha", ficha);
                    localStorage.setItem("obs", obs);
                    localStorage.setItem("idProjectoLoja", id);
                    $('#content').fadeIn(400);
                }
                else {
                    $('#content').fadeIn(400);
                    navigator.notification.alert("Falha ao carregar informação!", function() {
                        checkConnection();
                    }, "Erro", "OK");
                }
            });
});
//***************** PDFBTN CLICK EVENT *********************//
$(document).on('click', '#fichaBtn', function(e)
{
    //$.mobile.showPageLoadingMsg();
    //checkConnection();
    //openPDF2();
    //$.mobile.changePage("pdf.html", {transition: "none", changeHash: true});
               
               if (localStorage.getItem('ficha') != '')
               {
                    if(ref!=null)
                       // ref.close();
                    ref=null;
                    var url = 'http://qriaideias.no-ip.org/public/files/' + localStorage.getItem('ficha');
                    ref = window.open(url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,clearcache=yes, clearallcache=yes');
                  //  ref.addEventListener('exit', function(event) { ref.close(); });
                    ref.addEventListener('loadstop', function(event) {
                        if(event.url!=url)
                            ref.close();
                        alert("stop " + event.url);
                        ref.insertCSS({code: "body { background: #000000"});
                    });
                    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
                                    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                                    ref.addEventListener('exit', function(event) { alert(event.type);ref.close(); ref=null;});
               }
               else
                navigator.notification.alert("Item sem ficha técnica!", function() {}, "Aviso", "OK");
});
//***************** FOTOBTN CLICK EVENT *********************//
$(document).on('click', '#fotosBtn', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("fotos.html", {transition: "none", changeHash: true});
    //var idLoja = $(this).attr("rel");
    //e.stopImmediatePropagation();
    //e.preventDefault();
    // getImage();    
});
//****************** OBSBTN CLICK EVENT *********************//
$(document).on('click', '#obsBtn', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("observacoes.html", {transition: "none", changeHash: true});
});
//*********** MAQUETEBTN CLICK EVENT INSERT Observacaolojaprojecto *********************//
$(document).on('click', '#maqueteBtn', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("maquete.html", {transition: "none", changeHash: true});
                               
});
//******************************** LOJA ITEM **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** FOTOS **************************************//
$('#page4').live('pageshow', function() {

    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);


    var idProjecto = localStorage.getItem('idProjecto');
    var idLoja = localStorage.getItem('idLoja');

    var userType = localStorage.getItem("userType");

    if (userType == 4)
        $(".footer").hide();

    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getimages/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
    $.getJSON(url, function(data)
    {
        if (data !== '')
        {
            var lenght = 0;
            $.each(data, function(i, item)
            {
                lenght++;
                var foto = item['foto'];
                var idFoto = item['id'];
                var fotoNome = item['nome'];
         
                if (!isOdd(i)) {
                    var li = '<div class="ui-block-a" class="imgDivGal"><div class="divGal"><img id="' + idFoto + '" rel="' + foto + '"  class="fotoList" src="http://qriaideias.no-ip.org/public/images/' + foto + '" alt="' + fotoNome + '"/></div></div>';
                }
                else {
                    var li = '<div class="ui-block-b" class="imgDivGal"><div class="divGal"><img id="' + idFoto + '" rel="' + foto + '"  class="fotoList" src="http://qriaideias.no-ip.org/public/images/' + foto + '" alt="' + fotoNome + '"/></div></div>';
                }
                $(".ui-grid-a").append(li);
            });
              
           // $(".ui-grid-a").listview("refresh");
            $("#content").fadeIn(400);

            if (lenght == 0)
                navigator.notification.alert("Item sem fotos!", function() {
                }, "", "OK");
        }
        else
        {
            $("#content").fadeIn(400);
            navigator.notification.alert("Item sem fotos!", function() {
                checkConnection();
            }, "Erro", "OK");
        }
              
              
              
    });
                 function xpto(){
                    var h=1000;
                    $.each($(".fotoList"),function(){
                           var hAux = $(this).height();

                           if(hAux < h){
                               h = hAux;
                           }
                           });
                    $(".divGal").css("height",h);
                 }
                 
                 setTimeout(xpto,500);
               //  setTimeout(function(){$(".divGal").css("height",h)},700);
                 
                 
});

$(document).on('click', '.fotoList', function()
{
    $.mobile.showPageLoadingMsg();
    var idFoto = $(this).attr("id");
    localStorage.setItem("idFoto", idFoto);
    var nomeFoto = $(this).attr("rel");
    localStorage.setItem("nomeFoto", nomeFoto);
    $.mobile.changePage("foto.html", {transition: "none", changeHash: true});
});

//************************ MENU INFERIOR ************************//
$(document).on('click', '#btnFoto', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    getImage();
});
$(document).on('click', '#btnInsertCommentMenu', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("insert_comment.html", {transition: "none", changeHash: true});
});
$(document).on('click', '#btnComment', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("comentarios.html", {transition: "none", changeHash: true});
});
$(document).on('click', '#btnMaquete', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("maquete.html", {transition: "none", changeHash: true});
});
//************************ @@MENU INFERIOR ************************//
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** FOTOS **************************************//

////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** FOTO ITEM **************************************//
$('#page5').live('pageshow', function() {

    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');
    var nomeFoto = localStorage.getItem('nomeFoto');

    var userType = localStorage.getItem("userType");

    if (userType == 4)
        $(".footer").hide();

    var url1 = 'http://qriaideias.no-ip.org/public/images/' + nomeFoto;
    
    $(document).off('#imgBig');             
    $("#imgBig").attr("src", url1);


    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);
    $('#content').fadeIn(400);
                 

                 
                 $(document).on('click', '#imgBig', function(e)
                                {
                                //$.mobile.showPageLoadingMsg();
                                //checkConnection();
                                //openPDF2();
                                //$.mobile.changePage("pdf.html", {transition: "none", changeHash: true});
                                
                                if (localStorage.getItem('nomeFoto') != '')
                                {
                                    if(ref!=null)
                                      //  ref.close();
                                    ref=null;
                                    ref = window.open(url1, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,clearcache=yes, clearallcache=yes');
                                 //   ref.addEventListener('exit', function(event) { ref.close(); });
                                    ref.addEventListener('loadstop', function(event) {
                                        
                                        alert("stop fotos " + event.url);
                                        ref.insertCSS({code: "body { background: #000000"});
                                    });
                                    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
                                    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                                    ref.addEventListener('exit', function(event) { alert(event.type); ref.close(); ref=null;});
                                }
                                else
                                navigator.notification.alert("Item sem foto!", function() {}, "Aviso", "OK");
                                });

                 
                 
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** FOTO ITEM **************************************//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** COMENTARIOS**************************************//
$('#page10').live('pageshow', function() {
    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');
    var idFoto = localStorage.getItem('idFoto');
    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);


    var idProjecto = localStorage.getItem('idProjecto');
    var idLoja = localStorage.getItem('idLoja');
    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getcomentariosfoto/' + idFoto + '&jsoncallback=?';
    $.getJSON(url, function(data)
    {
        var lenght = 0;
        if (data !== '')
        {
            $.each(data.reverse(), function(i, item)
            {
                lenght++;
                var obs = item['comentario'];
                var data = item['data'];
                var nome = item['nome'];
                var li = '<li> <div class="oberItemTop">' + nome + '<p class="oberItemDate">' + data + '</p></div><p class="oberItemCont">' + obs + '</p></li>';
                $("#comentList").append(li);
            });
            $("#comentList").listview("refresh");
            $('#content').fadeIn(400);
            if (lenght == 0)
                navigator.notification.alert("Item sem comentários!", function() {
                }, "", "OK");
        }
        else
        {
            $('#content').fadeIn(400);
            navigator.notification.alert("Item sem comentários!", function() {
                checkConnection();
            }, "Erro", "OK");
        }
    });

});
//************************ MENU INFERIOR  INSERT COMENTARIO ************************//
$(document).on('click', '#btnInsertComentario', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("insert_comment.html", {transition: "none", changeHash: true});
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** COMENTARIOS **************************************//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** INSERT COMENTARIO**************************************//
$('#page11').live('pageshow', function() {

    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);

    $('#content').fadeIn(400);
});
$(document).on('click', '#btnInsertComment', function(e)
{
    $.mobile.showPageLoadingMsg();
    insertCommentFoto($('#OberservacaoTextArea1').val());
    e.preventDefault();
    return(false);
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** INSERT COMENTARIO **************************************//

////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** MAQUETE ITEM **************************************//
$('#page6').live('pageshow', function() {

    $('#content').hide();
    $(document).off('#imgBig');
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');
    var maquete = localStorage.getItem('maquete');

    var url = 'http://qriaideias.no-ip.org/public/images/' + maquete;

        if (maquete != ''){
        $("#imgBig").attr("src", url);
                 }
    else
        navigator.notification.alert("Item sem maquete!", function() {
        }, "Aviso", "OK");

    
    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);
    $('#content').fadeIn(400);
                 
                 $(document).on('click', '#imgBig', function(e)
                                {
                 if (localStorage.getItem('maquete') != '')
                 {
                      if(ref!=null)
                                       // ref.close();
                    ref=null;
                    var url2 = 'http://qriaideias.no-ip.org/public/images/' + localStorage.getItem('maquete');
                    ref = window.open(url2, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,clearcache=yes, clearallcache=yes');
                    //ref.addEventListener('exit', function(event) { alert("close");ref.close(); });
                    ref.addEventListener('loadstop', function(event) {
                        alert("stop maquete " + event.url);
                        ref.insertCSS({code: "body { background: #000000"});
                    });
                    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
                                    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                                    ref.addEventListener('exit', function(event) { alert(event.type); ref.close(); ref=null;});
                 }
                 else
                 navigator.notification.alert("Item sem maquete!", function() {}, "Aviso", "OK");
                                });
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** MAQUETE ITEM **************************************//

////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** OBSERVACOES **************************************//
$('#page7').live('pageshow', function() {
    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);


    var idProjecto = localStorage.getItem('idProjecto');
    var idLoja = localStorage.getItem('idLoja');
    var url = 'http://qriaideias.no-ip.org/projectos/mobilerequest/getobservacoes/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
    $.getJSON(url, function(data)
    {
        var lenght = 0;
        if (data !== '')
        {
            $.each(data.reverse(), function(i, item)
            {
                lenght++;
                var obs = item['observacoes'];
                var data = item['data'];
                var nome = item['nome'];
                var li = '<li> <div class="oberItemTop">' + nome + '<p class="oberItemDate">' + data + '</p></div><p class="oberItemCont">' + obs + '</p></li>';
                $("#oberList").append(li);
            });
            $("#oberList").listview("refresh");
            $('#content').fadeIn(400);
            if (lenght == 0)
                navigator.notification.alert("Sem observações!", function() {
                }, "", "OK");
        }
        else
        {
            $('#content').fadeIn(400);
            navigator.notification.alert("em observações!", function() {
                checkConnection();
            }, "Erro", "OK");
        }
    });

});
//****************** INSERT BTN EVENT
$(document).on('click', '#btnInsertObs', function(e)
{
    $.mobile.showPageLoadingMsg();
    checkConnection();
    $.mobile.changePage("insert_observacao.html", {transition: "none", changeHash: true});
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** OBSERVACOES **************************************//

////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** INSERT OBSERVACOES **************************************//
$('#page8').live('pageshow', function() {

    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);


    var idProjecto = localStorage.getItem('idProjecto');
    var idLoja = localStorage.getItem('idLoja');
    $('#content').fadeIn(400);
});
$(document).on('click', '#OberservacaoInsert', function(e)
{
    $.mobile.showPageLoadingMsg();
    insertObservacao($('#OberservacaoTextArea').val());
    e.preventDefault();
    return(false);
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** INSERT OBSERVACOES **************************************//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** PDF **************************************//
$('#page9').live('pageshow', function() {
    $('#content').hide();
    var nomeProjecto = localStorage.getItem('nomeProjecto');
    var nomeLoja = localStorage.getItem('nomeLoja');

    $('#proj').text(nomeProjecto);
    $('#loja').text(nomeLoja);
                 
                 
    if (localStorage.getItem('ficha') != '')
    {
        var url = 'http://qriaideias.no-ip.org/public/files/' + localStorage.getItem('ficha');
        $("#embedURL").attr("href", url);
        $('#embedURL').gdocsViewer();
        $('#page9 iframe').width(645);
        //$('#page9 iframe').height(window.innerHeight - 90);
    }
    else
        navigator.notification.alert("Item sem ficha técnica!", function() {
        }, "Aviso", "OK");
    $('#content').fadeIn(400);

                 var myScroll;
                 function loaded() {
                 myScroll = new iScroll('page9 iframe', { zoom:true });
                 }
                 
                 document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                 
                 document.addEventListener('DOMContentLoaded', loaded, false);

});


//******************************** PDF **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//******************************** TAKE_PHOTO **************************************//

//****** FUNCTIONS
function getImage()
{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function(message)
    {
        navigator.notification.alert("Falha ao inserir imagem!", function() {
            checkConnection();
        }, "Erro", "OK");
    }, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 720
                //    destinationType: navigator.camera.destinationType.FILE_URI,
                //  sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );
}
//****** HANDLERS
function uploadPhoto(imageURI)
{
    $.mobile.showPageLoadingMsg();
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    //***************************** COLOCAR ID UTILIZADOR DINAMICO
    params.idUser = localStorage.getItem("userId");
    //***************************** COLOCAR ID LOJA PROJECTO DINAMICO
    params.idLojaProjecto = localStorage.getItem("idProjectoLoja");

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://qriaideias.no-ip.org/projectos/mobilerequest/uploadfoto", win, fail, options);

}
function win(r)
{
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    var obj = JSON.parse(r.response);
    if (obj.success === true)
    {
        $.mobile.hidePageLoadingMsg();
        navigator.notification.alert("Foto inserida!", function() {
        }, "Sucesso", "OK");
        var li = '<div class="ui-block-a"><a class="imgLink" rel="' + obj.image + '" href="#" ><img src="http://qriaideias.no-ip.org/public/images/' + obj.image + '" alt="' + obj.image + '"/></a></div>';
        $(".ui-grid-a").append(li);
    }
}

function fail(error)
{
    navigator.notification.alert(error.code, function() {
        checkConnection();
    }, "Erro", "OK");
}
//******************************** TAKE_PHOTO **************************************//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//*********** GENERAL FUNCTIONS *************//
function checkConnection()
{
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    if (networkState === Connection.UNKNOWN || networkState === Connection.NONE)
        navigator.notification.alert("Sem ligação à internet!", function() {
        }, "Erro", "OK");
}
function isOdd(num) {
    return num % 2;
}
function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}

//*********** INSERIR OBSERVAÇÃO **************//
function insertObservacao(obs)
{
    checkConnection();
    $.ajax({
        type: 'POST',
        scriptCharset: 'utf-8',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {observacao: obs},
        url: 'http://qriaideias.no-ip.org/projectos/mobilerequest/insertobservacaolojaprojecto/' + localStorage.getItem('idProjectoLoja') + '/' + localStorage.getItem('userId') + '/&jsoncallback=?',
        success: function(data)
        {
            // console.log(data);
            if (data == 1)
                navigator.notification.alert("Observação adicionada!", function() {
                }, "Sucesso", "OK");
            else
                navigator.notification.alert("Falha no servidor!", function() {
                    checkConnection();
                }, "Erro", "OK");
            $.mobile.hidePageLoadingMsg();
        },
        error: function(data)
        {
            console.log(data);
            navigator.notification.alert("Não foi possível ligar ao servidor!", function() {
                checkConnection();
            }, "Erro", "OK");
            $.mobile.hidePageLoadingMsg();
        }
    });
}
function insertCommentFoto(comment)
{
    checkConnection();
    $.ajax({
        type: 'POST',
        scriptCharset: 'utf-8',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {comentario: comment},
        url: 'http://qriaideias.no-ip.org/projectos/mobilerequest/insertcommentfoto/' + localStorage.getItem('userId') + '/' + localStorage.getItem('idFoto') + '/&jsoncallback=?',
        success: function(data)
        {
            // console.log(data);
            if (data == 1)
                navigator.notification.alert("Comentário adicionado!", function() {
                }, "Sucesso", "OK");
            else
                navigator.notification.alert("Falha no servidor!", function() {
                }, "Erro", "OK");
            $.mobile.hidePageLoadingMsg();
        },
        error: function(data)
        {
            console.log(data);
            navigator.notification.alert("Não foi possível ligar ao servidor!", function() {
                checkConnection();
            }, "Erro", "OK");
            $.mobile.hidePageLoadingMsg();
        }
    });
}