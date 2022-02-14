
import React, { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';

const BottomSheet =  React.forwardRef((props, ref)  => {

  const snapPoints = useMemo(() => ['40%', '70%'], []);

  const ContentComponent = props.contentComponent
  const handleSheetChanges = useCallback((index) => {
  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
        <ScrollView>
          {ContentComponent}
        </ScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default BottomSheet;

