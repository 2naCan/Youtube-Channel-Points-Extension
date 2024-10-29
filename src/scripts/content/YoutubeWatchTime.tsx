import React, { useEffect } from 'react';
import {usePrivy} from "@privy-io/react-auth";


const YouTubeWatchTime: React.FC = () => {

    const { user, authenticated } = usePrivy();

    useEffect(() => {

        if (!user) {
            console.log('User is not available, cannot set up event listener.');
            return;
        }
        if (authenticated === false) {
            console.log('User is not authenticated, cannot set up event listener.');
            return;
        }

        const userId = user.id
        const wallet = user.wallet

        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('scripts/content/youtubePlayerHook.js');
        script.onload = () => {
            script.remove();
        };
        document.head.appendChild(script);

        const handleWatchTimeEvent = (event: Event) => {

            const watchtimeEvent = event as CustomEvent<{ watchTime: number; author: string; }>;
            const { watchTime, author } = watchtimeEvent.detail;

            // Send the watch time data to the background script
            chrome.runtime.sendMessage({
                type: "updateWatchTime",
                payload: {
                    watchTime,
                    author,
                    userId, //privy userId
                    wallet //privy wallet obj
                }
            });
        };

        window.addEventListener('youtubeWatchTime', handleWatchTimeEvent, false);

        // remove listener on unmount
        return () => {
            window.removeEventListener('youtubeWatchTime', handleWatchTimeEvent);
        };
    }, [authenticated]);

    return null;
};

export default YouTubeWatchTime;
