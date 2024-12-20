import React from 'react'
import { createRoot } from 'react-dom/client'
import styles from '@/styles/index.css?inline'
import App from './App'
import Popup from "@/scripts/popup/Popup";
import {PrivyProvider, usePrivy} from "@privy-io/react-auth";
import YoutubeWatchTime from "@/scripts/content/YoutubeWatchTime";

const isProduction: boolean = process.env.NODE_ENV === 'production'
const ROOT_ID = 'RENAME_ME_IF_YOU_WANT'

const injectReact = (rootId: string): void => {
    try {
        const container = document.createElement('div')
        document.body.appendChild(container)

        if (container) {
            container.id = rootId
            container.style.position = 'inherit'
            container.style.zIndex = '2147483666'
        }

        if (isProduction) {
            console.log('Production mode 🚀. Adding Shadow DOM')
            container.attachShadow({ mode: 'open' })
        } else {
            console.log('Development mode 🛠')
        }

        const target: ShadowRoot | HTMLElement = isProduction ? container.shadowRoot! : container

        const root = createRoot(target!)

        root.render(
            <React.StrictMode>
                <PrivyProvider
                    appId="Privy app id" // Please replace with your Privy app id, found in the dashboard
                    config={{
                        loginMethods: ['email'],
                        appearance: {
                            theme: 'dark',
                            accentColor: '#676FFF',
                            logo: 'https://your-logo-url',
                        },
                        embeddedWallets: {
                            createOnLogin: 'users-without-wallets',
                        }
                    }}
                >
                    <>
                        {isProduction && <style>{styles.toString()}</style>}
                        <App />
                        <YoutubeWatchTime/>
                    </>
                </PrivyProvider>
            </React.StrictMode>
        )
    } catch (error) {
        console.error('Error Injecting React', error)
    }
}

injectReact(ROOT_ID)

