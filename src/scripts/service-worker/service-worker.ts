console.log('Background Service Worker Loaded')

chrome.runtime.onInstalled.addListener(async () => {
    console.log('Extension installed')
})

chrome.action.setBadgeText({ text: 'ON' })

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id!, { message: 'clicked_browser_action' })
    })
})

chrome.commands.onCommand.addListener(command => {
    console.log(`Command: ${command}`)

    if (command === 'refresh_extension') {
        chrome.runtime.reload()
    }
})

// Listen for messages from the content script
let lastRequestTime = 0;
const logEndpoint = "buildship endpoint"; //Please replace this with your buildship endpoint link

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - lastRequestTime;

    // Only log if more than 2 seconds have passed since the last request
    if (timeSinceLastRequest > 2000) {
        lastRequestTime = currentTime;

        // Check the type of message
        if (message.type === 'updateWatchTime') {
            const { watchTime, author, userId, wallet } = message.payload;

            // Log the received data
            console.log('Wallet Received', JSON.stringify(wallet, null, 2));
            console.log('Watch Time Update Received:', {
                watchTime,
                author,
                userId,
            });

            await fetch(logEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    author: author,
                    watch_time: watchTime,
                    wallet_address: wallet.address,
                }),
            });
        }
    } else {
        console.log('Skipping update, too frequent.');
    }
});


export {}
