<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>

      

        <title>POCKETNET</title>
        <meta name="description" content="A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches. ">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <meta name="keywords" content="Blockchain, Decentralized, Delete Facebook, Alternative Social Media, Social Network, Social Platform, No Censorship, Online Social Network, Facebook Alternative, Reddit Alternative, Twitter Alternative, Social Sharing Platform, Decentralized Social Network, Blockchain Social Network " />

        <meta http-equiv="Content-Security-Policy" content="
        default-src https: 'self'; 
        connect-src https: wss:;
        img-src 'self' data: https:;
        script-src 'self' https://pocketnet.app https://player.vimeo.com https://www.youtube.com https://s.ytimg.com https://cdn.rawgit.com https://embed.tawk.to https://cdn.jsdelivr.net 'unsafe-eval' 'unsafe-inline';
        style-src 'self'  https://use.fontawesome.com https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline';
        font-src 'self' https://fonts.gstatic.com https://static-v.tawk.to https://use.fontawesome.com;
        media-src *">

        <?php 
            
            require_once('php/og.php'); 

            $og = new OG($_GET);

            $og->get();
            $og->echotags();
        ?>

        <link rel="stylesheet" href="css/normalize.css?v=913822006827">
<link rel="stylesheet" href="css/tooltipster.core.min.css?v=686426210110">
<link rel="stylesheet" href="css/tooltipster.bundle.min.css?v=807909552289">
<link rel="stylesheet" href="css/main.css?v=527067769099">
<link rel="stylesheet" href="css/stblack.css?v=5190287446">
<link rel="stylesheet" href="css/plyr.css?v=966830901910">
<link rel="stylesheet" href="css/medium/medium-editor.css?v=302175370768">
<link rel="stylesheet" href="css/medium/medium-editor-insert-plugin.css?v=78230343235">
<link rel="stylesheet" href="css/medium/beagle.css?v=698948731507">

        
        <link rel="stylesheet" href="css/fontawesome/css/all.css">

        <script src="js/vendor/device.min.js?v=136"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js?v=136"></script>


       
       
    </head>
    <body id="application" class="menu-hide">

        <div id="headerWrapper">
        </div>

        <div id="menuWrapper">
        </div> 

        <div id="panelWrapper">
        </div> 

        <div id="navigationWrapper">
        </div> 

        <div class="contentWrapper"> 
            <div id="content">                
            </div>
        </div>

        <div id="footerWrapper">
            
        </div>

        <div class="bodyshadow">
        </div>     

        <div class="topPreloader" id="_topPreloader">
        </div>

        <div class="chats">
        </div>

        
        </div>

        <div id="matrix" class="matrix"></div>

        <div id="globalpreloader">
            <div class="table">
                <div>
                    <div class="icon">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
               
            </div>
        </div>


       <!-- <script src="cordova.js"></script>-->
                

        <script src="js/vendor/jquery-1.11.3.min.js?v=12"></script>
        <script src="chat/matrix-element.min.js"></script>

        <script type="text/javascript">

            _Node = false;
            
            topPreloader = function(percent){
                var el = $('#_topPreloader');


                var div = $("<div>");
                    el.removeClass('complete');
                    el.append(div);

                    var inip = el.attr('percent') || 0;

                    el.attr('percent', percent); 

                    div.width((percent - inip) + "%")

                if(percent <= 0 || percent >= 100){


                    el.addClass('complete');
                    el.attr('percent', 0); 

                    setTimeout(function(){

                        el.fadeOut(300);

                        setTimeout(function(){


                            el.html('');

                        },300)

                    },500)
                    
                }
                else{
                    el.fadeIn(1);
                }
                
            }

            topPreloader(15)
            
        </script>

        <script join src="js/vendor/underscore-min.js?v=5"></script>
<script join src="js/vendor/fingerprint2.js?v=5"></script>
<script join src="js/vendor/tooltipster.core.js?v=5"></script>
<script join src="js/vendor/tooltipster.bundle.js?v=5"></script>
<script join src="js/vendor/jquery-ui.min.js?v=5"></script>
<script join src="js/vendor/imagesloaded.pkgd.min.js?v=5"></script>
<script join src="js/vendor/timer.js?v=5"></script>
<script join src="js/vendor/ion.sound/ion.sound.min.js?v=5"></script>
<script join src="js/vendor/aesjs.js?v=5"></script>
<script join src="js/vendor/linkify.min.js?v=5"></script>
<script join src="js/vendor/linkify-html.min.js?v=5"></script>
<script join src="js/lib/pocketnet/btc17.js?v=5"></script>
<script join src="js/lib/pocketnet/buffer.js?v=5"></script>
<script join src="js/lib/client/system16.js?v=5"></script>
<script join src="js/lib/client/api.js?v=5"></script>
<script join src="js/vendor/pbkdf2.js?v=5"></script>
<script join src="js/vendor/sha1.js?v=5"></script>
<script join src="js/vendor/jdenticon.js?v=5"></script>
<script join src="js/vendor/paste.js?v=5"></script>
<script join src="js/vendor/jquery.md5.js?v=5"></script>
<script join src="js/vendor/jquery.animate-number.js?v=5"></script>
<script join src="js/vendor/jquery.touchSwipe.js?v=5"></script>
<script join src="js/vendor/emojione.js?v=5"></script>
<script join src="js/vendor/plyr.js?v=5"></script>
<script join src="js/vendor/reconnectingwebsocket.js?v=5"></script>
<script join src="js/vendor/rtc/db.js?v=5"></script>
<script join src="js/vendor/xss.min.js?v=5"></script>
<script join src="js/vendor/jquery.mark.js?v=5"></script>
<script join src="js/vendor/hc-sticky.js?v=5"></script>
<script join src="js/vendor/DateTimePicker.min.js?v=7"></script>
<script join src="js/vendor/moment.min.js?v=7"></script>
<script join src="js/vendor/axios.js"></script>

        
        <script>window.design = true;</script><script join src="js/functions.js?v=722274497970"></script>
<script join src="js/user.js?v=59775207057"></script>
<script join src="js/module.js?v=669920577122"></script>
<script join src="js/navn.js?v=130906405717"></script>
<script join src="js/validation.js?v=688586143186"></script>
<script join src="js/_map.js?v=964121747334"></script>
<script join src="js/localization.js?v=297993426617"></script>
<script join src="js/kit.js?v=381252629218"></script>
<script join src="js/satolist.js?v=345877106003"></script>
<script join src="js/messenger2/clientrtc.js?v=41597390411"></script>
<script join src="js/peertube-master.js?v=681315181907"></script>
<script join src="js/app.js?v=322828526798"></script>
<script join src="js/main.js?v=138867243781"></script>



        <script type="text/javascript">

            topPreloader(100);
            
        </script>

        

       

    </body>
</html>
