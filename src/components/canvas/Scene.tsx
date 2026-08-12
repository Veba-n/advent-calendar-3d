import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stars, Cloud } from '@react-three/drei'
import { Tree } from './Tree'
import { Snowman } from './Snowman'
import { House } from './House'
import { Snow } from './Snow'
import { Suspense } from 'react'

import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useCalendarStore } from '../../store/calendarStore'
import { Moon } from './Moon'
import { getWindowPosition } from '../../utils/grid'

import * as easing from 'maath/easing'

import { useState, useEffect, useMemo } from 'react'

const rigTargetVec = new Vector3()

const CameraRig = ({ setIsResetting }: { setIsResetting: (v: boolean) => void }) => {
    const selectedDay = useCalendarStore((state) => state.selectedDay)

    useEffect(() => {
        if (selectedDay === null) {
            setIsResetting(true)
        }
    }, [selectedDay, setIsResetting])

    useFrame((state, delta) => {
        const isMobile = window.innerWidth < 768

        if (selectedDay !== null) {
            const target = getWindowPosition(selectedDay)
            const zoomDistance = isMobile ? 7 : 5.5

            rigTargetVec.set(target.x, target.y, target.z + zoomDistance)
            easing.damp3(state.camera.position, rigTargetVec, 0.8, delta)
            state.camera.lookAt(target.x, target.y, target.z)

        } else {
            // Return to home
            const defaultDist = isMobile ? 40 : 30
            rigTargetVec.set(0, 0, defaultDist)

            // Only animate if we are resetting (moving back to home)
            if (state.camera.position.distanceTo(rigTargetVec) > 0.1) {
                easing.damp3(state.camera.position, rigTargetVec, 0.8, delta)
                state.camera.lookAt(0, 0, 0)
            } else {
                // We are home
                setIsResetting(false)
            }
        }
    })
    return null
}

export const Scene = () => {
    const selectedDay = useCalendarStore((state) => state.selectedDay)
    const [isResetting, setIsResetting] = useState(false)

    // Pre-calculate deterministic tree positions
    const forestTrees = useMemo(() => {
        const trees: { id: number; position: [number, number, number]; scale: number }[] = []
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2
            const radius = 15 + ((i * 37) % 11)
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius - 10
            if (z <= 5) {
                trees.push({
                    id: i,
                    position: [x, -5, z],
                    scale: 0.8 + ((i * 13) % 7) * 0.08
                })
            }
        }
        return trees
    }, [])

    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 30], fov: 45 }}
            className="w-full h-full"
        >
            <color attach="background" args={['#050510']} />

            <Suspense fallback={null}>
                <Environment preset="night" />
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={0.8}
                    castShadow
                />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Cloud opacity={0.5} speed={0.4} segments={15} position={[0, 10, -10]} color="#a0a0a0" />
                <Cloud opacity={0.3} speed={0.3} segments={15} position={[-10, 15, -15]} color="#a0a0a0" />
                <Cloud opacity={0.3} speed={0.3} segments={15} position={[10, 12, -15]} color="#a0a0a0" />

                {/* Forest */}
                {forestTrees.map((tree) => (
                    <Tree key={tree.id} position={tree.position} scale={tree.scale} />
                ))}

                <House />
                <Snowman position={[6, -5, 4]} />
                <Snow />
                <Moon />
                <CameraRig setIsResetting={setIsResetting} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.8} intensity={0.5} />
                </EffectComposer>

                <OrbitControls
                    enabled={selectedDay === null && !isResetting}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                    minDistance={10}
                    maxDistance={60}
                />
            </Suspense>
        </Canvas>
    )
}
