import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CalendarState {
    openedWindows: number[]
    selectedDay: number | null
    openWindow: (day: number) => void
    closeWindow: () => void
    isWindowOpen: (day: number) => boolean
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set, get) => ({
            openedWindows: [],
            selectedDay: null,
            openWindow: (day) => {
                const { openedWindows } = get()
                if (!openedWindows.includes(day)) {
                    set({ openedWindows: [...openedWindows, day], selectedDay: day })
                } else {
                    set({ selectedDay: day })
                }
            },
            closeWindow: () => set({ selectedDay: null }),
            isWindowOpen: (day) => get().openedWindows.includes(day),
        }),
        {
            name: 'advent-calendar-storage',
        }
    )
)
