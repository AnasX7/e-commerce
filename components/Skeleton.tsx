import { MotiView } from 'moti'

type SkeletonProps = {
  width: number | `${number}%`
  height: number
  radius?: number
}

const SkeletonLoader = ({ width, height, radius = 4}: SkeletonProps) => {
  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 2000,
        loop: true,
      }}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: '#E5E7EB',
      }}
    />
  )
}

export default SkeletonLoader
