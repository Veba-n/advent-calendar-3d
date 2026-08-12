import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { createSmokeTexture } from '../../utils/textureGenerator'

export const Smoke = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<any>(null)
    const texture = useMemo(() => createSmokeTexture(), [])

    // Particle data: [x, y, z, scale, speed, randomOffset]
    const particleCount = 30
    const particles = useMemo(() => {
        const data = new Float32Array(particleCount * 6)
        for (let i = 0; i < particleCount; i++) {
            const i6 = i * 6
            data[i6] = (Math.random() - 0.5) * 0.5 // x
            data[i6 + 1] = Math.random() * 5 // y (spread out initially)
            data[i6 + 2] = (Math.random() - 0.5) * 0.5 // z
            data[i6 + 3] = 0.5 + Math.random() * 0.5 // scale
            data[i6 + 4] = 0.5 + Math.random() * 0.5 // speed
            data[i6 + 5] = Math.random() * 100 // random offset
        }
        return data
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3
                const i6 = i * 6

                // Update Y position
                particles[i6 + 1] += particles[i6 + 4] * delta

                // Reset if too high
                if (particles[i6 + 1] > 4) {
                    particles[i6 + 1] = 0
                    particles[i6] = (Math.random() - 0.5) * 0.5
                    particles[i6 + 2] = (Math.random() - 0.5) * 0.5
                }

                // Wiggle effect
                const time = state.clock.elapsedTime + particles[i6 + 5]
                const wiggle = Math.sin(time * 2) * 0.1 * (particles[i6 + 1] / 2) // Wiggle more as it rises

                positions[i3] = particles[i6] + wiggle
                positions[i3 + 1] = particles[i6 + 1]
                positions[i3 + 2] = particles[i6 + 2] + wiggle
            }
            ref.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <group position={position}>
            <Points ref={ref} positions={new Float32Array(particleCount * 3)} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    map={texture}
                    size={1.5}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    color="#eeeeee"
                />
            </Points>
        </group>
    )
}
