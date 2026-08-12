import { Sphere } from '@react-three/drei'

export const Moon = () => {
    return (
        <group position={[8, 10, -5]}>
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial
                    color="#ffffcc"
                    emissive="#ffffcc"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </Sphere>
            {/* Glow effect using a larger, transparent sphere or just relying on Bloom */}
        </group>
    )
}
