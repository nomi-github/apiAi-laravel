function send(){
    var text = $("#query").val();

    $.post(
        'api/api-ai',
        {
            'query': text
        },
        function(item) {
            
            if(item.action != "play.music" ){
                responsiveVoice.speak(item.speech, 'UK English Female', {onend: speakNews});
            }

            if(item.action == "play.music"){
                responsiveVoice.speak(item.speech, 'UK English Female', {onend: playMusic});
            }
            
            function speakNews(){ //no need to pass the object...
                if(item.news.title){
                responsiveVoice.speak(item.news.title + item.news.body, "Deutsch Female");
                } else {
                    responsiveVoice.speak("Sorry, No news found");
                }
            }

            if(item.action == "show.news") {
                var image =     '<div class="card"><div class="card-main"><div class="card-img"><img alt="alt text" src="' +
                                        item.news.image
                                        +'" style="width: 100%;"></div>';

                var content =   '<div class="card-inner"><h3>'+
                                        item.news.title
                                        +'</h3><p>'+
                                        item.news.body
                                        +'</p><p>'+
                                        item.news.date
                                        +'</p></div>';
                                    
                if(!item.news.link) {
                    var action = '</div></div>';
                }
                var action =    '<div class="card-action"><a class="btn btn-flat waves-attach waves-effect" href="'+
                                        item.news.permalink
                                        +'"><span class="icon">check</span>read more...</a></div></div></div> ';
                          
                var news = image + content + action;

                $('#news').html(news);
            }

            if(item.action == "news.search"){
                var content =   '<div class="card-inner"><p>'+
                                        item.speech
                                        +'</p></div>';
                $('#news').html(content);
            }
            function playMusic(){
                if(item.action == "play.music" || item.action == "wisdom.unknown"){
                    var player =   '<div class="card-main"><div style="text-align:center;" class="card-inner"><audio controls autoplay>'+
                                    '<source src="'+item.music+'" type="audio/mpeg">'+
                                    '</audio></div></div>';
                    $('#news').html(player);
                }
            }

        }
    );
}