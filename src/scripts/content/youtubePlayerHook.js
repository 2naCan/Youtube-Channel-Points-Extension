(() => {
    let player;
    let lastTime = 0;
    let watchTime = 0;
    let author = '';
    let batchInterval = 30; // How often the data is sent to content script
    let lastBatchTime = 0;
    let isPaused = false;


    function checkForPlayer() {
        const moviePlayer = document.getElementById("movie_player");
        if (moviePlayer) {
            player = moviePlayer;
            observePlayer();
        } else {
            setTimeout(checkForPlayer, 1000);
        }
    }

    function observePlayer() {
        setInterval(() => {
            if (player) {
                const state = player.getPlayerState();
                const currentTime = player.getCurrentTime();

                author = player.getVideoData().author; // Get video author

                // track time if playing
                if (state === 1) { // 1 means playing
                    watchTime += currentTime - lastTime;
                    isPaused = false;
                }

                lastTime = currentTime;

                // check if its been long enough to send the data
                if (currentTime - lastBatchTime >= batchInterval) {
                    sendWatchTimeData(watchTime, author);
                    lastBatchTime = currentTime; // Reset batch timer

                    watchTime = 0;
                }

                // Send data on pause or end of the video
                if (state === 2 || state === 0) { // 2 is paused. 0 is ended
                    if (!isPaused) { // If it wasn't already paused
                        sendWatchTimeData(watchTime, author);
                        isPaused = true;

                        watchTime = 0;
                    }
                }
            }
        }, 1000);
    }

    function sendWatchTimeData(watchTime, author) {
        const event = new CustomEvent('youtubeWatchTime', {
            detail: {
                watchTime,
                author,
            }
        });
        window.dispatchEvent(event);
    }

    checkForPlayer();
})();
