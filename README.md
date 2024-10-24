
# YouTube Channel Points Extension

This project is a browser extension that tracks users YouTube watch time per channel and rewards them with on-chain XP for watching creators. The watch time data is stored using **Supabase** and **Buildship** workflows, with the extension integrating **Privy** for authentication and wallet management.

## Project Overview

The extension captures the following data:
- **Video author**: The YouTube channel the user is watching.
- **Watch time**: How long the user spends watching a video.

This data is sent to a BuildShip workflow and logged in Supabase, allowing users to accumulate rewards based on their engagement. The rewards are provided as on-chain XP, making it easy to track and incentivize watch time.

## Key Technologies

- **Privy**: Used for user authentication, linking a user's watch history to their wallet and user ID.
- **Supabase**: Handles the backend database for storing users' watch time data.
- **Buildship Workflows**: Used for managing on-chain reward distribution based on watch time data.

## How It Works

1. **Track Watch Time**: The extension monitors the user's YouTube activity, capturing the amount of time spent watching each video.
2. **Log Watch Data**: The watch time data is processed and sent to a server using **Supabase**. Each entry includes the video author, the amount of time watched, and the user’s ID.
3. **Reward Users**: Based on the logged watch time, users earn on-chain XP via **Buildship**, which can be used to reward users for their engagement.

### Project Setup

Start by installing your dependencies as usual. 

```bash
npm install
```

## Project Overview

```bash
ChannelPointsExtension/
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── dist/
├── node_modules/
├── src/
│   ├── scripts/
│   │   └── content
│   │       └── App.tsx
│   │       └── index.tsx
│   │       └── youtubePlayerHook.js
│   │       └── YoutubeWatchTime.tsx
│   │   └── onInstalled
│   │       └── App.tsx
│   │       └── index.tsx
│   │       └── onInstalled.html
│   │   └── options
│   │       └── Options.tsx
│   │       └── index.tsx
│   │       └── options.html
│   │   └── popup
│   │       └── Popup.tsx
│   │       └── index.tsx
│   │       └── popup.html
│   │   └── service-worker
│   │       └── service-worker.tsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── browser.ts
│   ├── index.html
│   ├── manifest.ts # Generates Manifest.json
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

```bash
npm run dev
```

## Building and Shipping 

To get the extension running on Chrome, you'll need to do a couple steps. Firstly, run the build command, which uses vite to build and output to the `dist` folder.

```bash
npm run build
```

From here, open Chrome and go to `chrome://extensions`, then hit `Load Unpacked` and choose the newly made `dist` directory.

You'll notice that `npm run build` calls on two vite configs, one for your `content` script, and another for everything else. The reasoning for this is that we're having to output two very different builds (a normal 'vite'-ish HTML build, and a library (the `content` script)).

## Future Plans

- **Watch Stats Dashboard**: Create a user interface where users can view detailed statistics on their watch time, such as total hours watched per creator or time spent on specific content.
- **Leaderboards**: Implement global or community-based leaderboards where users can compare their watch time with others.
- **Achievements and Badges**: Introduce achievements or badges that users can unlock based on their watch time milestones, specific creators watched, or other unique metrics.
- **Improved UI**: Build the extension's interface, providing easy access to stats, achievements, and the reward system directly from the extension popup.
