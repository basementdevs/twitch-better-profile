import React from "react";

export default function Hero({children}: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center" style={{marginTop: 32, marginBottom: 32}}>
            <h1 className="text-4xl font-semibold">Twitch Profiler</h1>
            <p className="text-lg font-light">Sign in with Twitch to get started</p>
            {children}
        </div>
    );
}