import * as THREE from 'three'

export const createNoiseTexture = (width = 512, height = 512, opacity = 0.2, color = '#000000') => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!

    // Parse color
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)

    // 1. Base Layer: Low-res noise upscaled (Cloudy effect)
    const lowResSize = 64
    const lowResCanvas = document.createElement('canvas')
    lowResCanvas.width = lowResSize
    lowResCanvas.height = lowResSize
    const lowResCtx = lowResCanvas.getContext('2d')!

    const lowResImgData = lowResCtx.createImageData(lowResSize, lowResSize)
    const lowResData = lowResImgData.data

    for (let i = 0; i < lowResData.length; i += 4) {
        lowResData[i] = r
        lowResData[i + 1] = g
        lowResData[i + 2] = b
        lowResData[i + 3] = Math.random() * 255 * opacity // Varying alpha
    }
    lowResCtx.putImageData(lowResImgData, 0, 0)

    // Draw low-res noise scaled up (smoothing enabled by default)
    ctx.drawImage(lowResCanvas, 0, 0, width, height)

    // 2. Detail Layer: High-res fine grain (subtle)
    const detailImgData = ctx.getImageData(0, 0, width, height)
    const detailData = detailImgData.data

    for (let i = 0; i < detailData.length; i += 4) {
        // Add subtle variation to existing pixels
        const noise = (Math.random() - 0.5) * 20
        detailData[i] = Math.min(255, Math.max(0, detailData[i] + noise))
        detailData[i + 1] = Math.min(255, Math.max(0, detailData[i + 1] + noise))
        detailData[i + 2] = Math.min(255, Math.max(0, detailData[i + 2] + noise))
        // Keep alpha from cloud layer but add slight noise
        detailData[i + 3] = Math.min(255, Math.max(0, detailData[i + 3] + (Math.random() - 0.5) * 10))
    }

    ctx.putImageData(detailImgData, 0, 0)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
}

export const createBrickTexture = (color1 = '#8b0000', color2 = '#700000') => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = '#daceceff' // Mortar color
    ctx.fillRect(0, 0, 512, 512)

    const brickW = 64
    const brickH = 32

    for (let y = 0; y < 512; y += brickH + 2) {
        const offset = (y / (brickH + 2)) % 2 === 0 ? 0 : brickW / 2
        for (let x = -brickW; x < 512; x += brickW + 2) {
            ctx.fillStyle = Math.random() > 0.5 ? color1 : color2
            ctx.fillRect(x + offset, y, brickW, brickH)
        }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
}

export const createRoofTexture = (color1 = '#2c3e50', color2 = '#34495e') => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = color1
    ctx.fillRect(0, 0, 512, 512)

    const tileW = 64
    const tileH = 64

    // Draw overlapping shingles
    for (let y = -tileH; y < 512; y += tileH / 2) {
        const row = Math.floor(y / (tileH / 2))
        const offset = row % 2 === 0 ? 0 : tileW / 2

        for (let x = -tileW; x < 512; x += tileW) {
            // Gradient for 3D effect
            const gradient = ctx.createLinearGradient(x + offset, y, x + offset, y + tileH)
            gradient.addColorStop(0, color2)
            gradient.addColorStop(1, color1)

            ctx.fillStyle = gradient

            // Draw shingle shape (rounded bottom)
            ctx.beginPath()
            ctx.moveTo(x + offset, y)
            ctx.lineTo(x + offset + tileW, y)
            ctx.lineTo(x + offset + tileW, y + tileH - 15)
            ctx.quadraticCurveTo(x + offset + tileW / 2, y + tileH + 5, x + offset, y + tileH - 15)
            ctx.closePath()
            ctx.fill()

            // Outline/Shadow
            ctx.strokeStyle = 'rgba(0,0,0,0.4)'
            ctx.lineWidth = 2
            ctx.stroke()
        }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    // Rotate texture slightly if needed, but usually standard UVs are fine. 
    // If user said "diagonal", it might be the UV mapping on the pyramid.
    // Let's try to keep it standard first with this better pattern.
    return texture
}

export const createFabricTexture = (color = '#ffffff') => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = color
    ctx.fillRect(0, 0, 512, 512)

    // Fine weave
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    for (let y = 0; y < 512; y += 2) {
        ctx.fillRect(0, y, 512, 1)
    }
    for (let x = 0; x < 512; x += 2) {
        ctx.fillRect(x, 0, 1, 512)
    }

    // Larger cross-hatch for texture depth
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    for (let y = 0; y < 512; y += 8) {
        ctx.fillRect(0, y, 512, 2)
    }
    for (let x = 0; x < 512; x += 8) {
        ctx.fillRect(x, 0, 2, 512)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
}

export const createSmokeTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!

    // Radial gradient for soft puff
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(220, 220, 220, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 128, 128)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
}
