MSApp.execUnsafeLocalFunction(function () {
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
        //navigator.splashscreen.show();
        $.mobile.allowCrossDomainPages = true;
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
        // var designWidth = 640; // zoom to fit this ratio
        // var designHeight = 960; // not 800 b/c top bar is 38 pixels tall
        var designWidth = 720; // zoom to fit this ratio
        var designHeight = 1280; // not 800 b/c top bar is 38 pixels tall
        //var scaleChange = 1; // % change in scale from above #s


        /*  var docWidth = window.outerWidth;
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
          }
          checkConnection();
          */
    }

    $(".aBack").bind('touchstart', function () {
        $(".aBack").addClass('aBackDown');
    }).bind('touchend', function () {
        $(".aBack").removeClass('aBackDown');
    });
    //************************* HOME BTN *************************//
    $(document).on('click', '.aHome', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("projectos.html", { transition: "none", changeHash: true, allowSamePageTransition: true, reloadPage: true });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOGIN **************************************//
    MSApp.execUnsafeLocalFunction(function () {
        $('body').live('pageinit', function () {
            $('body').die('pageinit');
            //$('#header').hide();
            if (localStorage.getItem("login") !== 0) {
                // $.mobile.changePage("projectos.html");
                // return(false);
            }
            MSApp.execUnsafeLocalFunction(function () {
                $('#btnLogin').click(function (event) {
                    checkConnection();
                    var user = $("#username").val();
                    var pass = $("#password").val();
                    var url = 'http://mobile.qriaideias.com/logins/mobilerequest/login/' + user + '/' + CryptoJS.SHA1(pass) + '&jsoncallback=?';
                    MSApp.execUnsafeLocalFunction(function () {


                       // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
                        WinJS.xhr({
                            type: "GET",
                            url: url,
                            headers: { "Content-type": "application/json" },
                            responseType:"json"
                        }).then(function complete(request) {
                            var data = eval('(' + request.responseText + ')');
                            if (data['sucess'] == true) {
                                localStorage.setItem("userId", data['userId']);
                                localStorage.setItem("login", 1);
                                localStorage.setItem("userType", data['userType']);
                                $.mobile.changePage("projectos.html", { transition: "none" });
                            }
                            else {
                                //$.mobile.changePage("login.html");
                                //$('#loginFailure').show();
                                navigator.notification.alert("Username ou password errada!", function () {
                                }, "Aviso", "OK");
                                localStorage.setItem("login", 0);
                            }
                           
                        }, function error(er) {
                            var err = er.statusText;
                            navigator.notification.alert("Username ou password errada!", function () {
                            }, "Aviso", "OK");
                            localStorage.setItem("login", 0);
                        });
                      //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»


/*
                        $.getJSON(url, function (data) {
                            if (data['sucess'] == true) {
                                localStorage.setItem("userId", data['userId']);
                                localStorage.setItem("login", 1);
                                localStorage.setItem("userType", data['userType']);
                                $.mobile.changePage("projectos.html", { transition: "none" });
                            }
                            else {
                                //$.mobile.changePage("login.html");
                                //$('#loginFailure').show();
                                navigator.notification.alert("Username ou password errada!", function () {
                                }, "Aviso", "OK");
                                localStorage.setItem("login", 0);
                            }
                        });
                        */
                    });
                    return false;
                });
            });
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
        var id = localStorage.getItem('userId');
        var type = localStorage.getItem('userType');

        if (type == 1)
            var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getprojectos/0&jsoncallback=?';
        else
            var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getprojectos/' + id + '&jsoncallback=?';

        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var projId = item['id'];
                    var li = '<li class="ulList1Li"><a class="projA" href="lojas.html" data-transition="none" rel=' + projId + '>' + item['nome'] + '</a></li>';
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

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
     /*   $.getJSON(url, function (data) {
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var projId = item['id'];
                    var li = '<li class="ulList1Li"><a class="projA" href="lojas.html" data-transition="none" rel=' + projId + '>' + item['nome'] + '</a></li>';
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
            
        });*/
        //######################################################################################################################## NEW
        var url2 = 'http://mobile.qriaideias.com/projectos/mobilerequest/getnotificacoes/' + id + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url2,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //-----
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
            //----
        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      /*  $.getJSON(url2, function (data) {
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
    */
    });
    
    //######################################################################################################################## @NEW
    //**** LIST CLICK EVENT
    $(document).on('click', '.projA', function () {
        $.mobile.showPageLoadingMsg();
        var idProj = $(this).attr("rel");
        var nomeProjecto = $(this).html();

        localStorage.setItem("idProjecto", idProj);
        localStorage.setItem("nomeProjecto", nomeProjecto);
        $.mobile.changePage("lojas.html", { transition: "none", changeHash: true });
        return (false);
    });

    //######################################################################################################################## NEW
    //*****************************  notificações
    $('#page12').live('pageshow', function () {
        checkConnection();
        $('#content').hide();
        var id = localStorage.getItem('userId');

        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getnotificacoes/' + id + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //-----
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
                if (lenght == 0)
                    $.mobile.changePage("projectos.html", { transition: "none" });
            }
            else {
                $.mobile.changePage("projectos.html", { transition: "none" });
            }
            var url2 = 'http://mobile.qriaideias.com/projectos/mobilerequest/removenotificacoes/' + id + '&jsoncallback=?';
            WinJS.xhr({
                type: "GET",
                url: url2,
                headers: { "Content-type": "application/json" },
                responseType: "json"
            }).then(function complete(request) {
                var data = eval('(' + request.responseText + ')');
                //-----
                alert(data);
                //----
            }, function error(er) {
                var err = er.statusText;
                navigator.notification.alert("Erro de Servidor!", function () {
                }, "Aviso", "OK");
            });
            //----
        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
            return (false);
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      /*  $.getJSON(url, function (data) {
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
                if (lenght == 0)
                    $.mobile.changePage("projectos.html", { transition: "none" });
            }
            else {
                $.mobile.changePage("projectos.html", { transition: "none" });
            }
            var url2 = 'http://mobile.qriaideias.com/projectos/mobilerequest/removenotificacoes/' + id + '&jsoncallback=?';
            $.getJSON(url2, function (data) {
                alert(data);
            });
            return (false);
        });
        */
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
        $.mobile.changePage("fotos.html", { transition: "none", changeHash: true });
    });
    $(document).on('click', '#btnNotificacoes', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("notificacoes.html", { transition: "none", changeHash: true });
    });
    //######################################################################################################################## @NEW
    //******************************** PROJECTOS **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOJAS **************************************//
    //***** GET LOJAS
    $('#page2').live('pageshow', function () {
        checkConnection();
        $('#content').hide();
        var idProjecto = localStorage.getItem('idProjecto');
        var nomeProjecto = localStorage.getItem('nomeProjecto');

        $('#proj').text(nomeProjecto);
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getlojas/' + idProjecto + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //---
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var lojaId = item['id'];
                    var li = '<li class="ulList2Li"><a class="lojaA" href="loja.html" data-transition="none" rel=' + lojaId + '>' + item['nome'] + '</a></li>';
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
                    checkConnection();
                }, "Aviso", "OK");
            }
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    /*    $.getJSON(url, function (data) {
            var lenght = 0;
            if (data != '') {
                $.each(data, function (i, item) {
                    lenght++;
                    var lojaId = item['id'];
                    var li = '<li class="ulList2Li"><a class="lojaA" href="loja.html" data-transition="none" rel=' + lojaId + '>' + item['nome'] + '</a></li>';
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
                    checkConnection();
                }, "Aviso", "OK");
            }
        });
        */
    });
    //**** LIST CLICK EVENT
    $(document).on('click', '.lojaA', function () {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        var idLoja = $(this).attr("rel");
        var nomeLoja = $(this).html();
        localStorage.setItem("idLoja", idLoja);
        localStorage.setItem("nomeLoja", nomeLoja);
        $.mobile.changePage("loja.html", { transition: "none", changeHash: true });
    });
    //******************************** LOJAS **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** LOJA ITEM **************************************//
    $('#page3').live('pageshow', function () {
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
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getprojectoloja/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //---
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
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      /*  $.getJSON(url,
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
                */
    });
    //***************** PDFBTN CLICK EVENT *********************//
    $(document).on('click', '#fichaBtn', function (e) {
        //$.mobile.showPageLoadingMsg();
        //checkConnection();
        //openPDF2();
        //*********************************** ANDROID
        //$.mobile.changePage("pdf.html", {transition: "none", changeHash: true});
      /*  if (localStorage.getItem('ficha') != '') {
            var url = 'http://mobile.qriaideias.com/public/files/' + localStorage.getItem('ficha');
            ref = window.open('http://docs.google.com/viewer?url=' + url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
        }
        else
            navigator.notification.alert("Item sem ficha técnica!", function () {
            }, "Aviso", "OK");*/
        //*********************************** @ANDROID          
        //********************************** IOS 
                  if (localStorage.getItem('ficha') != '')
                  {
                       if(ref!=null)
                           ref.close();
                       ref=null;
                       var url=null;
                       var url = 'http://mobile.qriaideias.com/public/files/' + localStorage.getItem('ficha');
                       ref = window.open(url, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
                      // ref.addEventListener('exit', function(event) { ref.close(); });
                       ref.addEventListener('loadstop', function() {
                           ref.insertCSS({code: "body { background: #ffffff"});
                       });
                  }
                  else
                   navigator.notification.alert("Item sem ficha técnica!", function() {}, "Aviso", "OK");
               
        //********************************** @IOS
    });

    //***************** FOTOBTN CLICK EVENT *********************//
    $(document).on('click', '#fotosBtn', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("fotos.html", { transition: "none", changeHash: true });
        //var idLoja = $(this).attr("rel");
        //e.stopImmediatePropagation();
        //e.preventDefault();
        // getImage();    
    });
    //****************** OBSBTN CLICK EVENT *********************//
    $(document).on('click', '#obsBtn', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("observacoes.html", { transition: "none", changeHash: true });
    });
    //*********** MAQUETEBTN CLICK EVENT INSERT Observacaolojaprojecto *********************//
    $(document).on('click', '#maqueteBtn', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("maquete.html", { transition: "none", changeHash: true });

    });
    //******************************** LOJA ITEM **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** COMENTARIOS**************************************//
    $('#page10').live('pageshow', function () {
        $('#content').hide();
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');
        var idFoto = localStorage.getItem('idFoto');
        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);


        var idProjecto = localStorage.getItem('idProjecto');
        var idLoja = localStorage.getItem('idLoja');
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getcomentariosfoto/' + idFoto + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //---
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
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
            $.mobile.hidePageLoadingMsg();
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
  /*      $.getJSON(url, function (data) {
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
        */
    });
    //************************ MENU INFERIOR  INSERT COMENTARIO ************************//
    $(document).on('click', '#btnInsertComentario', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("insertcomment.html", { transition: "none", changeHash: true });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** COMENTARIOS **************************************//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT COMENTARIO**************************************//
    $('#page11').live('pageshow', function () {

        $('#content').hide();
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);

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
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');
        var maquete = localStorage.getItem('maquete');

        var url = 'http://mobile.qriaideias.com/public/images/' + maquete;

        if (maquete != '') {
            $("#imgBig2").attr("src", url);
        }
        else
            navigator.notification.alert("Item sem maquete!", function () {
            }, "Aviso", "OK");


        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);
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
                var url2 = 'http://mobile.qriaideias.com/public/images/' + localStorage.getItem('maquete');
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
        $('#content').hide();
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);


        var idProjecto = localStorage.getItem('idProjecto');
        var idLoja = localStorage.getItem('idLoja');
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getobservacoes/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //---
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
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
     /*   $.getJSON(url, function (data) {
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
        */
    });
    //****************** INSERT BTN EVENT
    $(document).on('click', '#btnInsertObs', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        MSApp.execUnsafeLocalFunction(function () {
            $.mobile.changePage("insertobsevacao.html", { transition: "none", changeHash: true });
        });
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** OBSERVACOES **************************************//

    ////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT OBSERVACOES **************************************//
    MSApp.execUnsafeLocalFunction(function () {
        $('#page8').live('pageshow', function () {

            $('#content').hide();
            var nomeProjecto = localStorage.getItem('nomeProjecto');
            var nomeLoja = localStorage.getItem('nomeLoja');

            $('#proj').text(nomeProjecto);
            $('#loja').text(nomeLoja);


            var idProjecto = localStorage.getItem('idProjecto');
            var idLoja = localStorage.getItem('idLoja');
            $('#content').fadeIn(400);
        });
        $(document).on('click', '#OberservacaoInsert', function (e) {
            $.mobile.showPageLoadingMsg();
            MSApp.execUnsafeLocalFunction(function () {
                insertObservacao($('#OberservacaoTextArea').val());
            });
            e.preventDefault();
            return (false);
        });
    });

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT OBSERVACOES **************************************//

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** PDF **************************************//
    $('#page9').live('pageshow', function () {
        $('#content').hide();
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');

        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);


        if (localStorage.getItem('ficha') != '') {
            var url = 'http://mobile.qriaideias.com/public/files/' + localStorage.getItem('ficha');
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
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/insertobservacaolojaprojecto/' + localStorage.getItem('idProjectoLoja') + '/' + localStorage.getItem('userId') + '/&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "POST",
            url: url,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            responseType: "html",
            data: "observacao="+obs
        }).then(function complete(request) {
            var data = request.responseText;
            //---
            if (data == 1)
                navigator.notification.alert("Observação adicionada!", function () {
                }, "Sucesso", "OK");
            else 
                navigator.notification.alert("Falha no servidor!", function () {
                    checkConnection();
                }, "Erro", "OK");
                $.mobile.hidePageLoadingMsg();
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
            $.mobile.hidePageLoadingMsg();
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    /*    $.ajax({
            type: 'POST',
            scriptCharset: 'utf-8',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: { observacao: obs },
            url: 'http://mobile.qriaideias.com/projectos/mobilerequest/insertobservacaolojaprojecto/' + localStorage.getItem('idProjectoLoja') + '/' + localStorage.getItem('userId') + '/&jsoncallback=?',
            success: function (data) {
                // console.log(data);
                if (data == 1)
                    navigator.notification.alert("Observação adicionada!", function () {
                    }, "Sucesso", "OK");
                else
                    navigator.notification.alert("Falha no servidor!", function () {
                        checkConnection();
                    }, "Erro", "OK");
                $.mobile.hidePageLoadingMsg();
            },
            error: function (data) {
                console.log(data);
                navigator.notification.alert("Não foi possível ligar ao servidor!", function () {
                    checkConnection();
                }, "Erro", "OK");
                $.mobile.hidePageLoadingMsg();
            }
        }); */
    }
    
});