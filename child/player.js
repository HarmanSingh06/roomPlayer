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

function getCurrentTime() {
    return currentTime = player.getCurrentTime();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    console.log(id)
}
function seek(timeLine) {
    player.seekTo(timeLine);
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function pauseVideo() {
    player.pauseVideo();
}
function playVideo() {
    player.playVideo()
}
function stopVideo() {
    player.stopVideo()
}
async function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
    await db.ref("sessions/" + sessionId).on('value', (data) => {

        var state = data.val().state
        var seekTime = data.val().time
        
        if (state == 1) {
            playVideo()
        }
        else if (state == 2) {
            pauseVideo()
            seek(seekTime)
        }
        else if (state == 0) {
            console.log("video ended")
        }
        else if (state == -1) {
            console.log("video yet to start")
        }
    })
}
