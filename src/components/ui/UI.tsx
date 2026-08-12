import { useCalendarStore } from '../../store/calendarStore'

export const UI = () => {
    const selectedDay = useCalendarStore((state) => state.selectedDay)
    const closeWindow = useCalendarStore((state) => state.closeWindow)
    const openedWindows = useCalendarStore((state) => state.openedWindows)

    return (
        <div className="absolute inset-0 pointer-events-none z-10 select-none flex flex-col justify-between p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-white">
                    <h1 className="text-sm font-semibold tracking-wider uppercase text-amber-200">3D Advent Calendar</h1>
                    <p className="text-xs text-white/60">Holiday Countdown • {openedWindows.length}/24 Opened</p>
                </div>
            </div>

            {/* Bottom Actions / Hints */}
            <div className="flex flex-col items-center">
                {selectedDay !== null ? (
                    <button
                        onClick={() => closeWindow()}
                        className="pointer-events-auto flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 backdrop-blur-lg text-white px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 text-sm font-medium cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Back to House
                    </button>
                ) : (
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/60">
                        Click on any window number to open • Drag to rotate scene
                    </div>
                )}
            </div>
        </div>
    )
}
