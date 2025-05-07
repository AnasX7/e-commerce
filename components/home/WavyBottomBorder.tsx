import { Canvas, Rect, Path, Mask, Skia } from '@shopify/react-native-skia'

type WavyBottomBorderProps = {
  width: number
  height: number
  waveHeight?: number
  waveCount?: number
  bannerColor?: string
}

const WavyBottomBorder = ({
  width,
  height,
  waveHeight = 20,
  waveCount = 3,
  bannerColor,
}: WavyBottomBorderProps) => {
  const bottomPath = () => {
    const p = Skia.Path.Make()
    const baseY = height - waveHeight
    const seg = width / waveCount

    p.moveTo(0, baseY)
    for (let i = 0; i < waveCount; i++) {
      const x0 = i * seg
      const x1 = x0 + seg / 2
      const x2 = x0 + seg
      const cpY = baseY + (i % 2 === 0 ? -waveHeight : waveHeight)
      p.quadTo(x1, cpY, x2, baseY)
    }
    p.lineTo(width, height)
    p.lineTo(0, height)
    p.close()
    return p
  }

  const topPath = () => {
    const p = Skia.Path.Make()
    const baseY = waveHeight
    const seg = width / waveCount

    // start at top‑left
    p.moveTo(0, 0)
    p.lineTo(width, 0)
    p.lineTo(width, baseY)
    // draw wave backwards
    for (let i = 0; i < waveCount; i++) {
      const x0 = width - i * seg
      const x1 = x0 - seg / 2
      const x2 = x0 - seg
      const cpY = baseY + (i % 2 === 0 ? -waveHeight : waveHeight)
      p.quadTo(x1, cpY, x2, baseY)
    }
    p.lineTo(0, 0)
    p.close()
    return p
  }

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
      }}>
      <Mask
        mode='luminance'
        mask={
          <>
            {/* keep the whole rect */}
            <Rect x={0} y={0} width={width} height={height} color='white' />
            {/* punch out top wave */}
            <Path path={topPath()} color='black' />
            {/* punch out bottom wave */}
            <Path path={bottomPath()} color='black' />
          </>
        }>
        {/* banner background */}
        <Rect x={0} y={0} width={width} height={height} color={bannerColor} />
      </Mask>
    </Canvas>
  )
}

export default WavyBottomBorder
