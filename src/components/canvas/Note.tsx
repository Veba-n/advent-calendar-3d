import { Html } from '@react-three/drei'
import calendarData from '../../data/calendarData.json'
import { animated, useSpring } from '@react-spring/three'
import { useMemo } from 'react'
import { createNoiseTexture } from '../../utils/textureGenerator'

interface NoteProps {
    day: number
    isOpen: boolean
}

export const Note = ({ day, isOpen }: NoteProps) => {
    const content = calendarData.find(d => d.day === day)?.content || "No content"

    const { scale, position } = useSpring({
        scale: isOpen ? 1 : 0,
        position: isOpen ? [0, 0, 0.2] : [0, 0, 0],
        delay: isOpen ? 500 : 0, // Wait for window to open
        config: { tension: 200, friction: 20 }
    })

    const paperTexture = useMemo(() => createNoiseTexture(100, 100, 0.3, '#bb7f55ff'), [])

    return (
        <animated.group scale={scale as any} position={position as any}>
            {/* Paper Background */}
            <mesh>
                <planeGeometry args={[0.8, 0.8]} />
                <meshStandardMaterial map={paperTexture} color="#ceb17aff" />
            </mesh>

            {/* Text Content */}
            <Html
                transform
                occlude
                position={[0, 0, 0.01]}
                scale={0.15}
                style={{
                    width: '240px',
                    height: '240px',
                    color: '#2c1810',
                    textAlign: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                    boxSizing: 'border-box'
                }}
            >
                <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8b4513',
                    marginBottom: '6px'
                }}>
                    Day {day}
                </div>
                <div style={{
                    fontSize: '13px',
                    lineHeight: '1.4',
                    fontWeight: 500,
                    color: '#3e2723'
                }}>
                    {content}
                </div>
            </Html>
        </animated.group>
    )
}
