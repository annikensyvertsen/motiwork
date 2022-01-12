
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheet =  React.forwardRef((props, ref)  => {

  const snapPoints = useMemo(() => ['50%', '50%'], []);

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
        {ContentComponent}
        </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheet;

  // callbacks
  // const handlePresentModalPress = useCallback(() => {
  //   ref.current?.present();
  // }, []);