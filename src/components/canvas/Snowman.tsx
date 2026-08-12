import { useMemo } from 'react'
import { createNoiseTexture } from '../../utils/textureGenerator'

export const Snowman = ({ position }: { position: [number, number, number] }) => {
    const snowTexture = useMemo(() => createNoiseTexture(256, 256, 0.4, '#e4e4e4ff'), [])

    return (
        <group position={position}>
            {/* Bottom Body */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.9, 28, 28]} />
                <meshStandardMaterial map={snowTexture} color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Middle Body */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.8, 28, 28]} />
                <meshStandardMaterial map={snowTexture} color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 2.6, 0]}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial map={snowTexture} color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.2, 2.9, 0.5]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.2, 2.9, 0.5]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 2.7, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.08, 0.5, 16]} />
                <meshStandardMaterial color="#ff6600" />
            </mesh>

            {/* Hat (Optional but cute) */}
            <mesh position={[0, 3.4, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.6, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, 3.1, 0]}>
                <cylinderGeometry args={[0.7, 0.7, 0.1, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    )
}
