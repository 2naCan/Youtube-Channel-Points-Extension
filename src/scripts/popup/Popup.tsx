import React from 'react'

const Popup = () => {
    return (
        <div
            className="inline-flex flex-col justify-between p-8 border shadow w-96 h-44 bg-neutral-900 rounded-xl border-zinc-800">
            <div className="inline-flex items-start justify-center gap-4">
                <div className="inline-flex flex-col items-start justify-start gap-1">
                    <div className="text-base font-semibold leading-none text-neutral-50">
                        Youtube Channel Points
                    </div>
                    <div className="pr-2.5 justify-start items-start inline-flex">
                        <div className="text-sm font-normal leading-tight text-zinc-400">
                            Open youtube and look in the bottom right of your screen to log-in with Privy and start
                            earning rewards
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup
