import { Window } from './Window'
import { useMemo } from 'react'
import { createBrickTexture, createRoofTexture, createNoiseTexture } from '../../utils/textureGenerator'
import { Smoke } from './Smoke'

export const House = () => {
    // Generate grid positions for 24 windows
    // 4 rows of 6 windows? Or 6 rows of 4?
    // Let's do a 4x6 grid (4 rows, 6 columns)
    // House size needs to accommodate this.

    const windows = []
    const rows = 4
    const cols = 6
    const spacingX = 1.5
    const spacingY = 1.8

    // Center offset
    const startX = -((cols - 1) * spacingX) / 2
    const startY = ((rows - 1) * spacingY) / 2 - 1 // Shift down a bit

    for (let i = 0; i < 24; i++) {
        const row = Math.floor(i / cols)
        const col = i % cols

        const x = startX + col * spacingX
        const y = startY - row * spacingY

        windows.push(
            <Window
                key={i + 1}
                day={i + 1}
                position={[x, y, 0.6]} // Slightly in front of the house body
            />
        )
    }

    const brickTexture = useMemo(() => {
        const t = createBrickTexture('#8b0000', '#700000')
        t.repeat.set(3, 3)
        return t
    }, [])
    const roofTexture = useMemo(() => {
        const t = createRoofTexture('#2c3e50', '#34495e')
        t.repeat.set(4, 1) // Repeat horizontally for smaller tiles
        return t
    }, [])
    const chimneyTexture = useMemo(() => {
        const t = createBrickTexture('#8b0000', '#700000')
        t.repeat.set(1, 1) // Larger bricks for chimney
        return t
    }, [])
    const snowTexture = useMemo(() => createNoiseTexture(512, 512, 0.6, '#e4e4e4ff'), [])

    return (
        <group position={[0, 0, 0]}>
            {/* Main Building Body */}
            <mesh position={[0, -1, 0]}>
                <boxGeometry args={[10, 8, 4]} />
                <meshStandardMaterial map={brickTexture} /> {/* Dark Red House */}
            </mesh>

            {/* Roof */}
            <group position={[0, 5, 0]} scale={[1, 1, 0.5]}>
                {/* Main Roof Structure */}
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <cylinderGeometry args={[2, 8, 4.5, 4]} /> {/* Slightly larger and taller */}
                    <meshStandardMaterial map={roofTexture} />
                </mesh>

                {/* Roof Overhang/Base */}
                <mesh position={[0, -2.2, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <cylinderGeometry args={[7.8, 8.2, 0.3, 4]} />
                    <meshStandardMaterial color="#34495e" />
                </mesh>

                {/* Chimney */}
                <group position={[2.5, 1, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1, 3, 1]} />
                        <meshStandardMaterial map={chimneyTexture} />
                    </mesh>
                    {/* Chimney Cap */}
                    <mesh position={[0, 1.6, 0]}>
                        <boxGeometry args={[1.2, 0.2, 1.2]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>

                    {/* Smoke */}
                    <Smoke position={[0, 2, 0]} />

                    {/* Gifts */}
                    <group position={[0, 1.8, 0]}>
                        <mesh position={[0.2, 0, 0.2]} rotation={[0, 0.5, 0]}>
                            <boxGeometry args={[0.4, 0.4, 0.4]} />
                            <meshStandardMaterial color="#ff0000" />
                        </mesh>
                        <mesh position={[-0.2, 0, -0.1]} rotation={[0, -0.2, 0]}>
                            <boxGeometry args={[0.3, 0.3, 0.3]} />
                            <meshStandardMaterial color="#00ff00" />
                        </mesh>
                        <mesh position={[0, 0.35, 0]} rotation={[0, 0.8, 0]}>
                            <boxGeometry args={[0.25, 0.25, 0.25]} />
                            <meshStandardMaterial color="#0000ff" />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* Windows Container */}
            <group position={[0, 0, 2]}>
                {windows}
            </group>

            {/* Ground/Snow */}
            <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial map={snowTexture} color="#ffffff" />
            </mesh>
        </group>
    )
}
