import { useState, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'
import { useCalendarStore } from '../../store/calendarStore'
import { Note } from './Note'
import * as THREE from 'three'
import { createFabricTexture } from '../../utils/textureGenerator'

const sharedGlassMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.01,
    transmission: 0.7, // Glass
    thickness: 0.1,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.9,
    color: '#045e8880', // Blue tint
    ior: 1.5,
    attenuationColor: new THREE.Color('#095880ff'),
    attenuationDistance: 0.5,
    opacity: 1,
    transparent: true
})

interface WindowProps {
    day: number
    position: [number, number, number]
}

export const Window = ({ day, position }: WindowProps) => {
    const isOpen = useCalendarStore((state) => state.isWindowOpen(day))
    const selectedDay = useCalendarStore((state) => state.selectedDay)
    const openWindow = useCalendarStore((state) => state.openWindow)
    const [hovered, setHovered] = useState(false)
    const fabricTexture = useMemo(() => createFabricTexture('#8B4513'), [])

    const isSelected = selectedDay === day
    // If it's open but not selected, it's "ajar"
    const isAjar = isOpen && !isSelected

    // Animation for the main hinge (left side)
    const { rotationMain } = useSpring({
        rotationMain: isSelected
            ? [0, -Math.PI / 1.2, 0]
            : isAjar
                ? [0, -Math.PI / 6, 0] // Slightly open
                : [0, 0, 0],
        config: { mass: 1, tension: 200, friction: 20 }
    })

    const { fold } = useSpring({
        fold: isSelected ? Math.PI / 1.2 : 0,
        config: { mass: 1, tension: 180, friction: 24 }
    })

    const handleClick = (e: any) => {
        e.stopPropagation()
        openWindow(day)
    }

    // Custom Wavy Curtain Geometry
    const curtainGeo = useMemo(() => {
        const geometry = new THREE.PlaneGeometry(1.1, 1.1, 32, 32)
        const posAttribute = geometry.attributes.position

        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i)
            // Sinusoidal wave along X axis
            const z = Math.sin(x * 20) * 0.03 - 0.3
            posAttribute.setZ(i, z)
        }

        geometry.computeVertexNormals()
        return geometry
    }, [])

    return (
        <group position={position}>
            {/* Window Frame (Outer) */}
            <group position={[0, 0, -0.3]}>
                {/* Top */}
                <mesh position={[0, 0.55, 0]}>
                    <boxGeometry args={[1.2, 0.1, 1]} />
                    <meshStandardMaterial color="#2c3e50" />
                </mesh>
                {/* Bottom */}
                <mesh position={[0, -0.55, 0]}>
                    <boxGeometry args={[1.2, 0.1, 1.2]} />
                    <meshStandardMaterial color="#2c3e50" />
                </mesh>
                {/* Left */}
                <mesh position={[-0.55, 0, 0]}>
                    <boxGeometry args={[0.1, 1, 1]} />
                    <meshStandardMaterial color="#2c3e50" />
                </mesh>
                {/* Right */}
                <mesh position={[0.55, 0, 0]}>
                    <boxGeometry args={[0.1, 1, 1]} />
                    <meshStandardMaterial color="#2c3e50" />
                </mesh>
            </group>

            {/* Bifold Door Group */}
            {/* Hinge is on the left (-0.5) */}
            <group position={[-0.5, 0, 0.06]}>
                <animated.group rotation={rotationMain as any}>

                    {/* Pane 1 (Left half) */}
                    <group position={[0.25, 0, 0]}> {/* Center of left pane (width 0.5) */}
                        <mesh
                            onClick={handleClick}
                            onPointerOver={() => setHovered(true)}
                            onPointerOut={() => setHovered(false)}
                        >
                            <boxGeometry args={[0.48, 1, 0.05]} />
                            <primitive object={sharedGlassMaterial} attach="material" />
                        </mesh>

                        {/* Frame for Pane 1 */}
                        <mesh>
                            <boxGeometry args={[0.48, 1, 0.05]} />
                            <meshStandardMaterial color={hovered ? "#8b4513" : "#5d4037"} wireframe />
                        </mesh>

                        {/* Hinge for Pane 2 (Right side of Pane 1) */}
                        <group position={[0.24, 0, 0]}>
                            <animated.group rotation-y={fold as any}>
                                {/* Pane 2 (Right half) */}
                                <group position={[0.24, 0, 0]}>
                                    <mesh
                                        onClick={handleClick}
                                        onPointerOver={() => setHovered(true)}
                                        onPointerOut={() => setHovered(false)}
                                    >
                                        <boxGeometry args={[0.48, 1, 0.05]} />
                                        <primitive object={sharedGlassMaterial} attach="material" />
                                    </mesh>

                                    {/* Frame for Pane 2 */}
                                    <mesh>
                                        <boxGeometry args={[0.48, 1, 0.05]} />
                                        <meshStandardMaterial color={hovered ? "#8b4513" : "#5d4037"} wireframe />
                                    </mesh>

                                    {/* Day Number on Pane 2 */}
                                    <Text
                                        position={[0, 0, 0.04]}
                                        fontSize={0.4}
                                        color="white"
                                        anchorX="center"
                                        anchorY="middle"
                                    >
                                        {day}
                                    </Text>
                                </group>
                            </animated.group>
                        </group>
                    </group>

                </animated.group>
            </group>



            {/* Curtain (Behind the glass) */}
            <mesh position={[0, 0, 0.02]} geometry={curtainGeo}>
                <meshStandardMaterial
                    map={fabricTexture}
                    color="#8B4513"
                    emissive={isOpen ? "#000000" : "#ffaa00"} // Glow only when closed
                    emissiveIntensity={isOpen ? 0 : 0.5}
                    roughness={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <Note day={day} isOpen={isSelected} />
        </group>
    )
}
