import style from './SkeletonBlock.module.scss'

const SkeletonBlock = ({
  width,
  height,
  borderRadius = 4,
  className = '',
  variant = 'default', // 'default', 'text', 'button', 'icon'
  margin = '',
  marginTop = '',
  marginRight = '',
  marginBottom = '',
  marginLeft = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return style.textSkeleton
      case 'button':
        return style.buttonSkeleton
      case 'icon':
        return style.iconSkeleton
      default:
        return style.defaultSkeleton
    }
  }

  const getMarginStyles = () => {
    const styles = {}

    if (margin) styles.margin = margin
    if (marginTop) styles.marginTop = marginTop
    if (marginRight) styles.marginRight = marginRight
    if (marginBottom) styles.marginBottom = marginBottom
    if (marginLeft) styles.marginLeft = marginLeft

    return styles
  }

  return (
    <div
      className={`${getVariantStyles()} ${className}`}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        borderRadius: `${borderRadius}px`,
        ...getMarginStyles(),
      }}
    />
  )
}

export default SkeletonBlock
