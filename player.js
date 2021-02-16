var tag = document.createElement('script');
var id = localStorage.getItem("videoId");
var sessionId = localStorage.getItem("sessionId");
var currentTime;



/*------------------------YOUTUBE PLAYER API-----------------------------*/ 
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        controls: 0,
        height: '390',
        width: '640',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

}

function getCurrentTime(){
    currentTime = player.getCurrentTime()
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    console.log(id)
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
    getCurrentTime();
}
function stopVideo() {
    player.stopVideo();
}