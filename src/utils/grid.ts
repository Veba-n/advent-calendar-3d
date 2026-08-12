import { Vector3 } from 'three'

export const getWindowPosition = (day: number): Vector3 => {
    const index = day - 1
    const rows = 4
    const cols = 6
    const spacingX = 1.5
    const spacingY = 1.8

    const startX = -((cols - 1) * spacingX) / 2
    const startY = ((rows - 1) * spacingY) / 2 - 1

    const row = Math.floor(index / cols)
    const col = index % cols

    const x = startX + col * spacingX
    const y = startY - row * spacingY

    return new Vector3(x, y, 0.6)
}
