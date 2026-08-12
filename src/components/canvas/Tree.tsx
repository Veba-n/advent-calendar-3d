import { useMemo } from 'react'

export const Tree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
    // Randomize tree slightly
    const seed = useMemo(() => Math.random(), [])
    const treeScale = scale * (0.8 + seed * 0.4)

    return (
        <group position={position} scale={[treeScale, treeScale, treeScale]}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
                <meshStandardMaterial color="#4a3728" roughness={0.9} />
            </mesh>

            {/* Bottom Layer */}
            <mesh position={[0, 2.5, 0]}>
                <coneGeometry args={[1.5, 2, 8]} />
                <meshStandardMaterial color="#2d4c1e" roughness={0.8} />
            </mesh>
            {/* Snow on Bottom Layer */}
            <mesh position={[0, 2.6, 0]} scale={[0.9, 0.8, 0.9]}>
                <coneGeometry args={[1.5, 2, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Middle Layer */}
            <mesh position={[0, 3.8, 0]}>
                <coneGeometry args={[1.2, 2, 8]} />
                <meshStandardMaterial color="#2d4c1e" roughness={0.8} />
            </mesh>
            {/* Snow on Middle Layer */}
            <mesh position={[0, 3.9, 0]} scale={[0.9, 0.8, 0.9]}>
                <coneGeometry args={[1.2, 2, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Top Layer */}
            <mesh position={[0, 5, 0]}>
                <coneGeometry args={[0.8, 1.5, 8]} />
                <meshStandardMaterial color="#2d4c1e" roughness={0.8} />
            </mesh>
            {/* Snow on Top Layer */}
            <mesh position={[0, 5.1, 0]} scale={[0.9, 0.8, 0.9]}>
                <coneGeometry args={[0.8, 1.5, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>
        </group>
    )
}
