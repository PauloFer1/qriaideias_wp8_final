//******************************** FOTOS **************************************//
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
MSApp.execUnsafeLocalFunction(function () {
    $('#page4').live('pageshow', function () {

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

        var h = $(window).width() / 5;
        $(".divGal").css({ height: "10px" });
        var url;
        if (userType == 4)
            url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getimagescliente/' + idProjecto + '/' + idLoja + '&jsoncallback=?';
        else
            url = 'http://mobile.qriaideias.com/projectos/mobilerequest/getimages/' + idProjecto + '/' + idLoja + '&jsoncallback=?';

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
                var lenght = 0;
                $.each(data, function (i, item) {
                    lenght++;
                    var foto = item['foto'];
                    var idFoto = item['id'];
                    var fotoNome = item['nome'];

                    var validada = item['validada'];
                    var descricao = item['descricao'];
                    var classe;

                    if (validada == 0)
                        classe = "checkNo";
                    else
                        classe = "checkYes";

                    var html;
                    if (userType == 1)
                        html = '<a href="#" class="check ' + classe + '" id="' + idFoto + '" validada="' + validada + '" onclick="validateFoto(' + idFoto + ', ' + validada + ')"></a>';
                    else
                        html = '';

                    if (!isOdd(i)) {
                        var li = '<div class="ui-block-a" class="imgDivGal">' +
                                    '<div class="divGal">' + html +
                                        '<div class="imgBorder">' +
                                            '<img id="' + idFoto + '" rel="' + foto + '" class="fotoList" src="http://mobile.qriaideias.com/public/images/' + foto + '" alt="' + fotoNome + '"/>' +
                                        '</div>' +
                                    '</div>' +
                                    '<span class="fotoDescription" id="desc_' + idFoto + '">' + descricao + '</span>' +
                                '</div>';
                    }
                    else {
                        var li = '<div class="ui-block-b" class="imgDivGal"><div class="divGal">' + html + '<div class="imgBorder"><img id="' + idFoto + '" rel="' + foto + '"  class="fotoList" src="http://mobile.qriaideias.com/public/images/' + foto + '" alt="' + fotoNome + '"/></div></div> <span class="fotoDescription" id="desc_' + idFoto + '">' + descricao + '</span></div>';
                    }
                    MSApp.execUnsafeLocalFunction(function () {
                        $(".ui-grid-a").append(li);
                    });
                });

                $("#galeria").listview("refresh");
                $("#content").fadeIn(400);

                if (lenght == 0)
                    navigator.notification.alert("Item sem fotos!", function () {
                    }, "", "OK");
            }
            else {
                $("#content").fadeIn(400);
                navigator.notification.alert("Item sem fotos!", function () {
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
        /*  $.getJSON(url, function(data)
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
                      
                      var validada = item['validada'];
                      var descricao = item['descricao'];
                      var classe;
                      
                      if(validada == 0)
                          classe="checkNo";
                      else
                          classe="checkYes";
                      
                      var html;
                      if(userType==1)
                          html='<a href="#" class="check '+classe+'" id="'+idFoto+'" validada="'+validada+'" onclick="validateFoto('+idFoto+', '+validada+')"></a>';
                      else
                          html='';
                          
                      if (!isOdd(i)) {
                          var li = '<div class="ui-block-a" class="imgDivGal">'+
                                      '<div class="divGal">'+html+
                                          '<div class="imgBorder">'+
                                              '<img id="' + idFoto + '" rel="' + foto + '" class="fotoList" src="http://mobile.qriaideias.com/public/images/' + foto + '" alt="' + fotoNome + '"/>'+
                                          '</div>'+
                                      '</div>'+
                                      '<span class="fotoDescription" id="desc_'+idFoto+'">'+ descricao +'</span>'+
                                  '</div>';
                      }
                      else {
                          var li = '<div class="ui-block-b" class="imgDivGal"><div class="divGal">'+html+'<div class="imgBorder"><img id="' + idFoto + '" rel="' + foto + '"  class="fotoList" src="http://mobile.qriaideias.com/public/images/' + foto + '" alt="' + fotoNome + '"/></div></div> <span class="fotoDescription" id="desc_'+idFoto+'">'+ descricao +'</span></div>';
                      }
                      $(".ui-grid-a").append(li);
                  });
                    
                  $("#galeria").listview("refresh");
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
          */
        function resizeImgs() {

            alert(h);
        }
        //setTimeout(resizeImgs(),500);   
        //setTimeout(function(){$(".divGal").css("height",h)},700);     
    });

    $(document).on('click', '.fotoList', function () {
        $.mobile.showPageLoadingMsg();
        var idFoto = $(this).attr("id");
        localStorage.setItem("idFoto", idFoto);
        var nomeFoto = $(this).attr("rel");
        var description = $(this).attr("description");
        localStorage.setItem("descFoto", description);
        localStorage.setItem("nomeFoto", nomeFoto);

        $.mobile.changePage("foto.html", { transition: "none", changeHash: true });
    });

    //************************ MENU INFERIOR ************************//
    $(document).on('click', '#btnFoto', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        getImage();
    });
    $(document).on('click', '#btnInsertCommentMenu', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("insertcomment.html", { transition: "none", changeHash: true });
    });
    $(document).on('click', '#btnComment', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("comentarios.html", { transition: "none", changeHash: true });
    });
    $(document).on('click', '#btnMaquete', function (e) {
        $.mobile.showPageLoadingMsg();
        checkConnection();
        $.mobile.changePage("maquete.html", { transition: "none", changeHash: true });
    });
    //************************ @@MENU INFERIOR ************************//
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** FOTOS **************************************//

    ////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** FOTO ITEM **************************************//
    function isOdd(num) {
        return num % 2;
    }
    $('#page5').live('pageshow', function () {

        $('#imgBig').unbind('click');
        $('#content').hide();
        var nomeProjecto = localStorage.getItem('nomeProjecto');
        var nomeLoja = localStorage.getItem('nomeLoja');
        var nomeFoto = localStorage.getItem('nomeFoto');
        var idFoto = localStorage.getItem('idFoto');
        var userType = localStorage.getItem("userType");

        if (userType == 4) {
            $(".footer").hide();
            $("#editDesc").hide();
        }

        var url1 = null;
        url1 = 'http://mobile.qriaideias.com/public/images/' + nomeFoto;
        var url2 = 'http://mobile.qriaideias.com/projectos/mobilerequest/getimage/' + idFoto + '&jsoncallback=?';

        $("#imgBig").attr("src", url1);

        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "GET",
            url: url2,
            headers: { "Content-type": "application/json" },
            responseType: "json"
        }).then(function complete(request) {
            var data = eval('(' + request.responseText + ')');
            //---

            if (data !== '') {
                $.each(data, function (i, item) {
                    description = item['descricao'];
                    $('#description').html(description);
                });
            }
            //---
            return (false);

        }, function error(er) {
            var err = er.statusText;
            navigator.notification.alert("Erro de Servidor!", function () {
            }, "Aviso", "OK");
        });
        //  »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»

        /*  $.getJSON('http://mobile.qriaideias.com/projectos/mobilerequest/getimage/' + idFoto + '&jsoncallback=?', function(data)
          {
              if (data !== '')
              {
                  $.each(data, function(i, item)
                  {
                      description = item['descricao'];
                      $('#description').html(description);
                  });
              }
          });
          */

        $('#proj').text(nomeProjecto);
        $('#loja').text(nomeLoja);
        $('#content').fadeIn(400);

        //################################################################################################################ NEW
        function openWindow(e) {
            if (localStorage.getItem('nomeFoto') != '') {
                var css = "";
                ref = window.open(url1, '_blank', 'location=no,EnableViewPortScale=yes,clearsessioncache=yes,closebuttoncaption=sair');
                // ref.addEventListener('loadstart', function(event) { ref.insertCSS({code: "body { background: #000000;-webkit-transform: rotate(90deg); "+ css +"};"}); } );
                ref.addEventListener('loadstop', function (event) { ref.insertCSS({ code: "img {" + css + " } body {background: #ffffff;};" }); });
                //  ref.addEventListener('loadstop', resizeImage  );
                ref.addEventListener('exit', function (event) { ref.close(); });

            }
            else
                navigator.notification.alert("Item sem foto!", function () { }, "Aviso", "OK");
        };
        //################################################################################################################ @NEW
        //$(document).on('click', '#imgBig', openWindow);
        $('#imgBig').click(openWindow);
    });
    $(document).on('click', '#editDesc', function () {
        navigator.notification.prompt("Editar Descrição", editDescription, "Foto", ["OK", "CANCELAR"], $('#description').html())
    });
    function editDescription(results) {
        if (results.buttonIndex == 1) {
            checkConnection();
            var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/editdescricaofoto/' + localStorage.getItem('idFoto') + '/&jsoncallback=?';
            // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
            WinJS.xhr({
                type: "POST",
                url: url,
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                responseType: "html",
                data: "descricao=" + results.input1
            }).then(function complete(request) {
                var data = request.responseText;
                //---
                // console.log(data);
                if (data == 1) {
                    $('#description').html(results.input1);
                }
                else
                    navigator.notification.alert("Falha no servidor!", function () {
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
                    data: {descricao: results.input1},
                    url: 'http://mobile.qriaideias.com/projectos/mobilerequest/editdescricaofoto/' + localStorage.getItem('idFoto') + '/&jsoncallback=?',
                    success: function(data)
                    {
                        // console.log(data);
                        if (data == 1)
                            {
                                $('#description').html(results.input1);
                            }
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
                }); */
        }
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** FOTO ITEM **************************************//
    //
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
    $(document).on('click', '#btnInsertComment', function (e) {
        $.mobile.showPageLoadingMsg();
        insertCommentFoto($('#OberservacaoTextArea1').val());
        e.preventDefault();
        return (false);
    });
    function insertCommentFoto(comment) {
        checkConnection();
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/insertcommentfoto/' + localStorage.getItem('userId') + '/' + localStorage.getItem('idFoto') + '/&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "POST",
            url: url,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            responseType: "html",
            data: "comentario=" + comment
        }).then(function complete(request) {
            var data = request.responseText;
            //---
            if (data == 1)
                navigator.notification.alert("Comentário adicionado!", function () {
                }, "Sucesso", "OK");
            else
                navigator.notification.alert("Falha no servidor!", function () {
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
        /*   $.ajax({
               type: 'POST',
               scriptCharset: 'utf-8',
               contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
               data: { comentario: comment },
               url: 'http://mobile.qriaideias.com/projectos/mobilerequest/insertcommentfoto/' + localStorage.getItem('userId') + '/' + localStorage.getItem('idFoto') + '/&jsoncallback=?',
               success: function (data) {
                   // console.log(data);
                   if (data == 1)
                       navigator.notification.alert("Comentário adicionado!", function () {
                       }, "Sucesso", "OK");
                   else
                       navigator.notification.alert("Falha no servidor!", function () {
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
           });*/
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** INSERT COMENTARIO **************************************//
    //
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
    //******************************** TAKE_PHOTO **************************************//

    //****** FUNCTIONS
    function getImage() {
        navigator.notification.confirm("Escolher origem da foto!", gotoPhoto, "Inserir foto!", ["Camera", "Libraria"]);

    }
    //****** HANDLERS
    function insertDescription(results) {
        checkConnection();
        var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/insertdescricaofoto/' + localStorage.getItem('idFoto') + '/&jsoncallback=?';
        // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
        WinJS.xhr({
            type: "POST",
            url: url,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            responseType: "html",
            data: "descricao="+ results.input1
        }).then(function complete(request) {
            var data = request.responseText;
            //---
            // console.log(data);
            if (data == 1)
                navigator.notification.alert("Descrição adicionada!", function () {
                    $('#desc_' + localStorage.getItem('idFoto')).html(results.input1);
                }, "Sucesso", "OK");
            else
                navigator.notification.alert("Falha no servidor!", function () {
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
        /*  $.ajax({
              type: 'POST',
              scriptCharset: 'utf-8',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {descricao: results.input1},
              url: 'http://mobile.qriaideias.com/projectos/mobilerequest/insertdescricaofoto/' + localStorage.getItem('idFoto') + '/&jsoncallback=?',
              success: function(data)
              {
                  // console.log(data);
                  if (data == 1)
                      navigator.notification.alert("Descrição adicionada!", function() {
                          $('#desc_'+localStorage.getItem('idFoto')).html(results.input1);
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
          });*/
    }
    function confirmValidation(index) {
        var id = localStorage.getItem('validateId');
        var valida = localStorage.getItem('validateStatus');
        if (index == 1) {
            var newValida;
            if ($("#" + id).attr('validada') == 1)
                newValida = 0;
            else
                newValida = 1;

            var url = 'http://mobile.qriaideias.com/projectos/mobilerequest/validate_foto/' + id + '/' + newValida + '/&jsoncallback=?';
            // »»»»»»»»»»»»»»»»»»»»»»»»» WM »»»»»»»»»»»»»»»»»»»»»
            WinJS.xhr({
                type: "POST",
                url: url,
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                responseType: "html"
            }).then(function complete(request) {
                var data = request.responseText;
                //---
                // console.log(data);
                if (data == 1) {
                    if (newValida == 1) {
                        navigator.notification.alert("Foto Validada!", function () { }, "Sucesso", "OK");
                        $("#" + id).attr('class', 'check');
                        $("#" + id).addClass('checkYes');
                        $("#" + id).attr('validada', '1');
                    }
                    else {
                        navigator.notification.alert("Foto Invalidada!", function () { }, "Sucesso", "OK");
                        $("#" + id).attr('class', 'check');
                        $("#" + id).addClass('checkNo');
                        $("#" + id).attr('validada', '0');
                    }
                }
                else
                    navigator.notification.alert("Falha no servidor!", function () { }, "Erro", "OK");
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

            /*   $.ajax({
                   type: 'POST',
                   scriptCharset: 'utf-8',
                   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                   url: 'http://mobile.qriaideias.com/projectos/mobilerequest/validate_foto/' + id + '/' + newValida + '/&jsoncallback=?',
                   success: function(data)
                   {
                       // console.log(data);
                       if (data == 1){
                           if(newValida==1)
                               {
                                   navigator.notification.alert("Foto Validada!", function() {}, "Sucesso", "OK");
                                   $("#"+id).attr('class', 'check');
                                   $("#"+id).addClass('checkYes');
                                   $("#"+id).attr('validada', '1');
                               }
                           else
                               {
                                   navigator.notification.alert("Foto Invalidada!", function() {}, "Sucesso", "OK");
                                   $("#"+id).attr('class', 'check');
                                   $("#"+id).addClass('checkNo');
                                   $("#"+id).attr('validada', '0');
                               }
                       }
                       else
                           navigator.notification.alert("Falha no servidor!", function() {}, "Erro", "OK");
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
               });*/
        }
    }
    function validateFoto(id, valida) {
        checkConnection();
        var msg;
        if ($("#" + id).attr('validada') == 1)
            msg = "Invalidar Foto?";
        else
            msg = "Validar Foto?";
        localStorage.setItem('validateId', id);
        localStorage.setItem('validateStatus', valida);
        navigator.notification.confirm(msg, confirmValidation, "Fotos", ["sim", "não"]);
    }
    function gotoPhoto(index) {
        var src;
        if (index == 1)
            src = Camera.PictureSourceType.CAMERA;
        else
            src = Camera.PictureSourceType.PHOTOLIBRARY;
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function (message) {
            setTimeout(function () {
                navigator.notification.alert("Falha ao inserir imagem!", function () {
                    checkConnection();
                }, "Erro", "OK");
            }, 50);
        }, {
            quality: 50,
            targetWidth: 1280,
            targetHeight: 720,
            sourceType: src
            //    destinationType: navigator.camera.destinationType.FILE_URI,
            //  sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
        );
    }
    function uploadPhoto(imageURI) {
        $.mobile.showPageLoadingMsg();
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = new Object();
        params.idUser = localStorage.getItem("userId");
        params.idLojaProjecto = localStorage.getItem("idProjectoLoja");

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://mobile.qriaideias.com/projectos/mobilerequest/uploadfoto", win, fail, options);

    }
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        var userType = localStorage.getItem("userType");
        var obj = JSON.parse(r.response);
        if (obj.success === true) {
            var idFoto = obj.foto_id;
            $.mobile.hidePageLoadingMsg();
            // navigator.notification.alert("Foto inserida!", function() {}, "Sucesso", "OK");
            var html;
            if (userType == 1)
                html = '<a href="#" class="check checkNo" id="' + idFoto + '" onclick="validateFoto(' + idFoto + ', 0)"></a>';
            else
                html = '';
            var li = '<div class="ui-block-a" class="imgDivGal"><div class="divGal">' + html + '<div class="imgBorder"><img id="' + obj.foto_id + '" rel="' + obj.image + '"  class="fotoList" src="http://mobile.qriaideias.com/public/images/' + obj.image + '" alt="' + obj.image + '"/></div></div><span class="fotoDescription" id="desc_' + obj.foto_id + '"></span></div>';
            $(".ui-grid-a").append(li);
            localStorage.setItem("idFoto", obj.foto_id);
            navigator.notification.prompt("Inserir Descrição", insertDescription, "Foto Inserida", ["OK"], "");
        }
    }

    function fail(error) {
        navigator.notification.alert(error.code, function () {
            checkConnection();
        }, "Erro ai inserir foto!", "OK");
    }
    //******************************** TAKE_PHOTO **************************************//
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
});