var URL_BO = "http://mobile.qriaideias.com";
    var ref = null;
    var scaleChange = 1;
    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicity call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            app.receivedEvent('deviceready');
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;
        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };
    $(document).bind("mobileinit", function () {
        // Make your jQuery Mobile framework configuration changes here!                   


    });
    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady2, false);

    // PhoneGap is ready
    //


    function onDeviceReady2() {
        //navigator.splashscreen.show
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
        var designWidth = 640; // zoom to fit this ratio
        var designHeight = 960; // not 800 b/c top bar is 38 pixels tall
        //var designWidth = 720; // zoom to fit this ratio
        //var designHeight = 1280; // not 800 b/c top bar is 38 pixels tall
        //var scaleChange = 1; // % change in scale from above #s


      /*    var docWidth = window.outerWidth;
          var docHeight = window.outerHeight;

          if (docWidth != designWidth) 
          {
              var scaleX = docWidth / designWidth;
              var scaleY = docHeight / designHeight;
              if (scaleX < scaleY) {
                  $('body').css('zoom', scaleX);
                  scaleChange = scaleX;
              } else {
                  $('body').css('zoom', scaleY);
                  scaleChange = scaleY;
              }
          }*/
    }
    $(document).on('click', '.aBack', function (e) {
        var url = window.location.href;
        url = url.split('#').pop().split('?').pop();
        url = url.replace(url.substring(url.lastIndexOf('/') + 1), "index.html"+localStorage.getItem('history'));
        $.mobile.changePage(url, { reloadPage: false, changeHash: false });
    });
    $(document).on('click', '.refresh', function (e) {
        // checkConnection();
        var url = window.location.href;
        url = url.split('#').pop().split('?').pop();
        url = url.replace(url.substring(url.lastIndexOf('/') + 1), "index.html#page0");
        $.mobile.changePage(url, { reloadPage: false, changeHash: false });

        var url = window.location.href;
        url = url.split('#').pop().split('?').pop();
        url = url.replace(url.substring(url.lastIndexOf('/') + 1), "index.html#page1");
        $.mobile.changePage(url, { reloadPage: false, changeHash: false });
        //  $.mobile.changePage("projectos.html", { transition: "none", changeHash: true, allowSamePageTransition: true, reloadPage: true });
    });
    //************************* HOME BTN *************************//
    $(document).on('click', '.aHome', function (e) {
        // checkConnection();
        var url = window.location.href;
        url = url.split('#').pop().split('?').pop();
        url = url.replace(url.substring(url.lastIndexOf('/') + 1), "index.html#page1");
        $.mobile.changePage(url, { reloadPage: false, changeHash: false });
      //  $.mobile.changePage("projectos.html", { transition: "none", changeHash: true, allowSamePageTransition: true, reloadPage: true });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOGIN **************************************//
    $('body').live('pageinit', '#page0', function () {
            $('body').die('pageinit');
            //$('#header').hide();
            if (localStorage.getItem("login") !== 0) {
                // $.mobile.changePage("projectos.html");
                // return(false);
            }
            $('#btnLogin').click(function (event) {
                  //  checkConnection();
                    var user = $("#username").val();
                    var pass = $("#password").val();
                    var url = URL_BO+'/logins/mobilerequest/login/' + user + '/' + CryptoJS.SHA1(pass) + '&jsoncallback=?';



                        $.getJSON(url, function (data) {
                            if (data['sucess'] == true) {
                                localStorage.setItem("userId", data['userId']);
                                localStorage.setItem("login", 1);
                                localStorage.setItem("userType", data['userType']);
                               // var url = window.location.href;
                                //url = url.split('#').pop().split('?').pop();
                                //url = url.replace(url.substring(url.lastIndexOf('/') + 1), "projectos.html");
                                var url = window.location.href;
                                url = url.split('#').pop().split('?').pop();
                                url = url.replace(url.substring(url.lastIndexOf('/') + 1),"index.html#page1");
                                $.mobile.changePage(url, { reloadPage: false, changeHash: false });
                                //alert(url);
                               // $.mobile.changePage("projectos.html", { transition: "none", changeHash: true, allowSamePageTransition: true, reloadPage: true });
                             // $.mobile.changePage("#page1");
                            }
                            else {
                                //$.mobile.changePage("login.html");
                                //$('#loginFailure').show();
                                navigator.notification.alert("Username ou password errada!", function () {
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

    $('#page1').live('pageshow', function () {
        checkConnection();
        $('#content').hide();
        localStorage.setItem("history","#page0");
        var id = localStorage.getItem('userId');
        var type = localStorage.getItem('userType');

        if (type == 1)
            var url = URL_BO+'/projectos/mobilerequest/getprojectos/0&jsoncallback=?';
        else
            var url = URL_BO+'/projectos/mobilerequest/getprojectos/' + id + '&jsoncallback=?';

        $.getJSON(url, function (data) {
            $("#ulList1").html("");
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var projId = item['id'];
                    var li = '<li class="ulList1Li"><a class="projA" href="#page2" data-transition="none" rel=' + projId + '>' + item['nome'] + '</a></li>';
                    $("#ulList1").append(li);
                });
                $("#ulList1").listview("refresh");
                $('#content').fadeIn(400);
                if (lenght == 0)
                    navigator.notification.alert("Sem projectos!", function () { }, "", "OK");
            }
            else {
                navigator.notification.alert("Sem projectos!", function () {
                    checkConnection();
                }, "Erro", "OK");
            }
            return (false);
            
        });
        //######################################################################################################################## NEW
        var url2 = URL_BO+'/projectos/mobilerequest/getnotificacoes/' + id + '&jsoncallback=?';
        $.getJSON(url2, function (data) {
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                });
                if (lenght == 0)
                    $('#notificationBar').hide();
                else {
                    var pos = '';
                    if (lenght > 1)
                        pos = 'S';
                    $('#notificationBar').show();
                    $('#btnNotificacoes').html('<span class="nrNotifications">' + lenght.toString() + '</span>' + ' FOTO' + pos + ' NOVA' + pos);
                }
            }
            else {
                $('#notificationBar').hide();
            }
            return (false);
        });
    
    });
    
    //######################################################################################################################## @NEW
    //**** LIST CLICK EVENT
    $(document).on('click', '.projA', function () {
      //  $.mobile.showPageLoadingMsg();
        var idProj = $(this).attr("rel");
        var nomeProjecto = $(this).html();
        localStorage.setItem("idProjecto", idProj);
        localStorage.setItem("nomeProjecto", nomeProjecto);
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page2");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
       // $.mobile.changePage("lojas.html", { transition: "none", changeHash: true });
        return (false);
    });

    //######################################################################################################################## NEW
    //*****************************  notificações
    $('#page12').live('pageshow', function () {
        checkConnection();
        $('#content').hide();
        localStorage.setItem("history", "#page1");
        var id = localStorage.getItem('userId');

        var url = URL_BO+'/projectos/mobilerequest/getnotificacoes/' + id + '&jsoncallback=?';

        $.getJSON(url, function (data) {
            $("#ulList1").html("");
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var projId = item['id_projecto'];
                    var lojaId = item['id_loja'];
                    var li = '<li class="ulList1Li"><a class="notificacaoA" href="fotos.html" data-transition="none" rel=' + projId + ' id=' + lojaId + '>Foto em ' + item['nome'] + '</a></li>';
                    $("#ulList1").append(li);
                });
                $("#ulList1").listview("refresh");
                $('#content').fadeIn(400);
                if (lenght == 0) {
                    var linkFix = window.location.href;
                    linkFix = linkFix.split('#').pop().split('?').pop();
                    linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page2");
                    $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
                   // $.mobile.changePage("projectos.html", { transition: "none" });
                }
            }
            else {
                var linkFix = window.location.href;
                linkFix = linkFix.split('#').pop().split('?').pop();
                linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page2");
                $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
                //$.mobile.changePage("projectos.html", { transition: "none" });
            }
            var url2 = URL_BO+'/projectos/mobilerequest/removenotificacoes/' + id + '&jsoncallback=?';
            $.getJSON(url2, function (data) {
                alert(data);
            });
            return (false);
        });
        
    });
    //**** LIST CLICK EVENT
    $(document).on('click', '.notificacaoA', function () {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        var idLoja = $(this).attr("id");
        var idProj = $(this).attr("rel");
        var nomeLoja = $(this).html();
        localStorage.setItem("idLoja", idLoja);
        localStorage.setItem("idProjecto", idProj);
        localStorage.setItem("nomeLoja", nomeLoja);
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page4");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
      //  $.mobile.changePage("fotos.html", { transition: "none", changeHash: true });
    });
    $(document).on('click', '#btnNotificacoes', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page12");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
       // $.mobile.changePage("notificacoes.html", { transition: "none", changeHash: true });
    });
    //######################################################################################################################## @NEW
    //******************************** PROJECTOS **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOJAS **************************************//
    //***** GET LOJAS
    $('#page2').live('pageshow', function () {
        checkConnection();
        localStorage.setItem("history", "#page1");
        var idProjecto = localStorage.getItem('idProjecto');
        var nomeProjecto = localStorage.getItem('nomeProjecto');

        $('#proj').text(nomeProjecto);
        var url = URL_BO+'/projectos/mobilerequest/getlojas/' + idProjecto + '&jsoncallback=?';

        $.getJSON(url, function (data) {
            $("#ulList2").html("");
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var lojaId = item['id'];
                    var li = '<li class="ulList2Li"><a class="lojaA" href="#page3" data-transition="none" rel=' + lojaId + '>' + item['nome'] + '</a></li>';
                    $("#ulList2").append(li);
                });
                $("#ulList2").listview("refresh");
                $('#content').fadeIn(400);
                if (lenght == 0)
                    navigator.notification.alert("Item vazio!", function () {
                    }, "Aviso", "OK");
            }
            else {
                navigator.notification.alert("Item vazio!", function () {
                }, "Aviso", "OK");
            }
        });
        
    });
    //**** LIST CLICK EVENT
    $(document).on('click', '.lojaA', function () {
     //   $.mobile.showPageLoadingMsg();
        checkConnection();
        var idLoja = $(this).attr("rel");
        var nomeLoja = $(this).html();
        localStorage.setItem("idLoja", idLoja);
        localStorage.setItem("nomeLoja", nomeLoja);
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page3");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
      //  $.mobile.changePage("loja.html", { transition: "none", changeHash: true });
    });
    //******************************** LOJAS **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOJA ITEM **************************************//
    $('#page3').live('pageshow', function () {
        localStorage.setItem("history", "#page2");
        $('#content').hide();
        var idLoja = localStorage.getItem('idLoja');
        var idProjecto = localStorage.getItem('idProjecto');
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('.proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);
      
        var url = URL_BO+'/projectos/mobilerequest/getprojectoloja/' + idProjecto + '/' + idLoja + '&jsoncallback=?';

        $.getJSON(url,
                function (data) {
                    if (data !== '') {
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
                        navigator.notification.alert("Falha ao carregar informação!", function () {
                            checkConnection();
                        }, "Erro", "OK");
                    }
                });
    });
    //***************** PDFBTN CLICK EVENT *********************//
    $(document).on('click', '#fichaBtn', function (e) {
        //$.mobile.showPageLoadingMsg();
        //checkConnection();
        //openPDF2();
        //*********************************** ANDROID & WP8
        //$.mobile.changePage("pdf.html", {transition: "none", changeHash: true});
        if (localStorage.getItem('ficha') != '') {
            var url = URL_BO+'/public/files/' + localStorage.getItem('ficha');
            ref = window.open('http://docs.google.com/viewer?url=' + url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
        }
        else
            navigator.notification.alert("Item sem ficha técnica!", function () {
            }, "Aviso", "OK");
        //*********************************** @ANDROID          
        //********************************** IOS 
         /*         if (localStorage.getItem('ficha') != '')
                  {
                       if(ref!=null)
                           ref.close();
                       ref=null;
                       var url=null;
                       var url = URL_BO+'/public/files/' + localStorage.getItem('ficha');
                       ref = window.open(url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
                      // ref.addEventListener('exit', function(event) { ref.close(); });
                       ref.addEventListener('loadstop', function() {
                           ref.insertCSS({code: "body { background: #ffffff"});
                       });
                  }
                  else
                   navigator.notification.alert("Item sem ficha técnica!", function() {}, "Aviso", "OK");*/
               
        //********************************** @IOS
    });

    //***************** FOTOBTN CLICK EVENT *********************//
    $(document).on('click', '#fotosBtn', function (e) {
        checkConnection();
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page4");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
       // $.mobile.changePage("fotos.html", { transition: "none", changeHash: true });
        //var idLoja = $(this).attr("rel");
        //e.stopImmediatePropagation();
        //e.preventDefault();
        // getImage();    
    });
    //****************** OBSBTN CLICK EVENT *********************//
    $(document).on('click', '#obsBtn', function (e) {
        checkConnection();
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page7");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
     //   $.mobile.changePage("observacoes.html", { transition: "none", changeHash: true });
    });
    //*********** MAQUETEBTN CLICK EVENT INSERT Observacaolojaprojecto *********************//
    $(document).on('click', '#maqueteBtn', function (e) {
        checkConnection();
     /*   var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page6");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });*/
        //  $.mobile.changePage("maquete.html", { transition: "none", changeHash: true });
        var maquete = localStorage.getItem('maquete');
        var url = URL_BO + '/public/images/' + maquete;
        ref = window.open(url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');

    });
    //******************************** LOJA ITEM **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** COMENTARIOS**************************************//
    $('#page10').live('pageshow', function () {
        $('#content').hide();
        localStorage.setItem("history", "#page5");
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');
        var idFoto = localStorage.getItem('idFoto');
        $('.proj').text(nomeProjecto);
        $('.loja').text(nomeLoja);


        var idProjecto = localStorage.getItem('idProjecto');
        var idLoja = localStorage.getItem('idLoja');
        var url = URL_BO+'/projectos/mobilerequest/getcomentariosfoto/' + idFoto + '&jsoncallback=?';

        $.getJSON(url, function (data) {
            $("#comentList").html("");
            var lenght = 0;
            if (data !== '') {
                $.each(data.reverse(), function (i, item) {
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
                    navigator.notification.alert("Item sem comentários!", function () {
                    }, "", "OK");
            }
            else {
                $('#content').fadeIn(400);
                navigator.notification.alert("Item sem comentários!", function () {
                    checkConnection();
                }, "Erro", "OK");
            }
        });
    });
    //************************ MENU INFERIOR  INSERT COMENTARIO ************************//
    $(document).on('click', '#btnInsertComentario', function (e) {
        checkConnection();
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page11");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
      //  $.mobile.changePage("insertcomment.html", { transition: "none", changeHash: true });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** COMENTARIOS **************************************//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT COMENTARIO**************************************//
    $('#page11').live('pageshow', function () {

        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('.proj').text(nomeProjecto);
        $('.loja').text(nomeLoja);

        $('#content').fadeIn(400);
    });
    /*$(document).on('click', '#btnInsertComment', function (e) {
        $.mobile.showPageLoadingMsg();
        insertCommentFoto($('#OberservacaoTextArea1').val());
        e.preventDefault();
        return (false);
    });*/

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT COMENTARIO **************************************//

    ////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** MAQUETE ITEM **************************************//
    $('#page6').live('pageshow', function () {

        $('#content').hide();
        $('#imgBig2').unbind('click');
        localStorage.setItem("history", "#page3");
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');
        var maquete = localStorage.getItem('maquete');

        var url = URL_BO + '/public/images/' + maquete;

        if (maquete != '') {
            $("#imgBig2").attr("src", url);
        }
        else
            navigator.notification.alert("Item sem maquete!", function () {
            }, "Aviso", "OK");


        $('.proj').text(nomeProjecto);
        $('.loja').text(nomeLoja);
        $('#content').fadeIn(400);

        //############################################################################################# NEW
        $('#imgBig2').click(openWindowMaquete);

        function openWindowMaquete(e) {
            //############################################################################################# @NEW
            if (localStorage.getItem('maquete') != '') {
                /*    if(ref!=null)
                        ref.close();
                    ref=null;
                    var url2=null;
                    var url2 = 'http://qriaideias.no-ip.org/public/images/' + localStorage.getItem('maquete');
                    ref = window.open(url2, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
                 //   ref.addEventListener('exit', function(event) { alert("close");ref.close(); });
                    ref.addEventListener('loadstop', function() {
                        ref.insertCSS({code: "body { background: #ffffff"});
                    });*/
                //############################################################################################################### NEW
                var url2 = URL_BO+'/public/images/' + localStorage.getItem('maquete');
                var css = "width:100%;";
                ref = window.open(url2, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
                // ref.addEventListener('loadstart', function(event) { ref.insertCSS({code: "body { background: #000000;-webkit-transform: rotate(90deg); "+ css +"};"}); } );
                ref.addEventListener('loadstop', function (event) { ref.insertCSS({ code: "img {" + css + " } body {background: #ffffff;};" }); });
                //  ref.addEventListener('loadstop', resizeImage  );
                ref.addEventListener('exit', function (event) { ref.close(); });
                //############################################################################################################### NEW
            }
            else
                navigator.notification.alert("Item sem maquete!", function () { }, "Aviso", "OK");
        };
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** MAQUETE ITEM **************************************//

    ////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** OBSERVACOES **************************************//
    $('#page7').live('pageshow', function () {
        localStorage.setItem("history", "#page3");
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('.proj').text(nomeProjecto);
        $('.loja').text(nomeLoja);


        var idProjecto = localStorage.getItem('idProjecto');
        var idLoja = localStorage.getItem('idLoja');
        var url = URL_BO+'/projectos/mobilerequest/getobservacoes/' + idProjecto + '/' + idLoja + '&jsoncallback=?';

        $.getJSON(url, function (data) {
            $("#oberList").html("");
            var lenght = 0;
            if (data !== '') {
                $.each(data.reverse(), function (i, item) {
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
                    navigator.notification.alert("Sem observações!", function () {
                    }, "", "OK");
            }
            else {
                $('#content').fadeIn(400);
                navigator.notification.alert("em observações!", function () {
                    checkConnection();
                }, "Erro", "OK");
            }
        });
    });
    //****************** INSERT BTN EVENT
    $(document).on('click', '#btnInsertObs', function (e) {
  
        checkConnection();
        var linkFix = window.location.href;
        linkFix = linkFix.split('#').pop().split('?').pop();
        linkFix = linkFix.replace(linkFix.substring(linkFix.lastIndexOf('/') + 1), "index.html#page8");
        $.mobile.changePage(linkFix, { reloadPage: false, changeHash: false });
       //     $.mobile.changePage("insertobsevacao.html", { transition: "none", changeHash: true });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** OBSERVACOES **************************************//

    ////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT OBSERVACOES **************************************//
        $('#page8').live('pageshow', function () {
            localStorage.setItem("history", "#page7");
            var nomeProjecto = localStorage.getItem('nomeProjecto');
            var nomeLoja = localStorage.getItem('nomeLoja');

            $('.proj').text(nomeProjecto);
            $('.loja').text(nomeLoja);


            var idProjecto = localStorage.getItem('idProjecto');
            var idLoja = localStorage.getItem('idLoja');
            $('#content').fadeIn(400);
        });
        $(document).on('click', '#OberservacaoInsert', function (e) {
            insertObservacao($('#OberservacaoTextArea').val());
            e.preventDefault();
            return (false);
        });

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT OBSERVACOES **************************************//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** PDF **************************************//
    $('#page9').live('pageshow', function () {

        localStorage.setItem("history", "#page3");
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('.proj').text(nomeProjecto);
        $('.loja').text(nomeLoja);


        if (localStorage.getItem('ficha') != '') {
            var url = URL_BO+'/public/files/' + localStorage.getItem('ficha');
            $("#embedURL").attr("href", url);
            $('#embedURL').gdocsViewer();
            $('#page9 iframe').width(window.outerWidth);
            $('#page9 iframe').height((window.outerHeight - $('#header').height()));
            //  $('#embedURL').PDFDoc({source: url });
            //$('#page9 iframe').height(window.innerHeight - 90);
            //ref = window.open('http://docs.google.com/viewer?url='+url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
        }
        else
            navigator.notification.alert("Item sem ficha técnica!", function () {
            }, "Aviso", "OK");
        $('#content').fadeIn(400);

        var myScroll;
        function loaded() {
            myScroll = new iScroll('page9 iframe', { zoom: true });
        }

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        document.addEventListener('DOMContentLoaded', loaded, false);

    });


    //******************************** PDF **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//



    //*********** GENERAL FUNCTIONS *************//
    function checkConnection() {
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
            navigator.notification.alert("Sem ligação à internet!", function () {
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
    function insertObservacao(obs) {
        checkConnection();
        var url = URL_BO+'/projectos/mobilerequest/insertobservacaolojaprojecto/' + localStorage.getItem('idProjectoLoja') + '/' + localStorage.getItem('userId') + '/&jsoncallback=?';

        $.ajax({
            type: 'POST',
            scriptCharset: 'utf-8',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: { observacao: obs },
            url: URL_BO+'/projectos/mobilerequest/insertobservacaolojaprojecto/' + localStorage.getItem('idProjectoLoja') + '/' + localStorage.getItem('userId') + '/&jsoncallback=?',
            success: function (data) {
                // console.log(data);
                if (data == 1)
                    navigator.notification.alert("Observação adicionada!", function () {
                    }, "Sucesso", "OK");
                else
                    navigator.notification.alert("Falha no servidor!", function () {
                        checkConnection();
                    }, "Erro", "OK");
            },
            error: function (data) {
                console.log(data);
                navigator.notification.alert("Não foi possível ligar ao servidor!", function () {
                    checkConnection();
                }, "Erro", "OK");
            }
        }); 
    }
    
