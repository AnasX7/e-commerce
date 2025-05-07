import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import * as React from 'react'

const Sheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(
  (
    { index = 0, backgroundStyle, style, handleIndicatorStyle, ...props },
    ref
  ) => {
    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      []
    )
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        backgroundStyle={
          backgroundStyle ?? {
            backgroundColor: 'white',
          }
        }
        style={
          style ?? {
            borderWidth: 1,
            borderColor: 'rgb(230, 230, 235)',
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }
        }
        handleIndicatorStyle={
          handleIndicatorStyle ?? {
            backgroundColor: 'rgb(210, 210, 215)',
          }
        }
        backdropComponent={renderBackdrop}
        {...props}
      />
    )
  }
)

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null)
}

export { Sheet, useSheetRef }
