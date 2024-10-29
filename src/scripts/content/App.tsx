import React, { useEffect, useState } from 'react'
import {usePrivy} from "@privy-io/react-auth";

const App = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsOpen(true)
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        })
    }, [])

    const { user, login, authenticated, ready, logout } = usePrivy();

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-0 right-0 p-4">
                    <div className="inline-flex items-center justify-center h-16 rounded-full">
                        <div
                            className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                            <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                                <div className="font-normal leading-tight tracking-wider text-white text-normal">
                                    Log in to your Privy Account
                                </div>
                            </div>
                            <div className="privy">
                                {ready && authenticated ? (
                                    <div className="box">
                                        <button onClick={logout}>Logout</button>
                                    </div>
                                ) : (
                                    <button onClick={login}>Login</button>
                                )}
                            </div>
                            <div
                                className="inline-flex items-start self-stretch justify-start p-4 px-8 duration-200 bg-white rounded-full cursor-pointer hover:bg-gothamBlack-50">
                                <div
                                    className="text-base font-bold text-center text-black"
                                    onClick={toggleIsOpen}
                                >
                                    Close
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
