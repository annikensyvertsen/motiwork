import React from 'react';
import { Button, Paragraph, Dialog } from 'react-native-paper';

const ComponentDialog = ({visibleDialog, stopDialog}) => {

  return (
    <Dialog visible={visibleDialog} dismissable={false}>
      <Dialog.Title>Avslutt økt</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Er du sikker på at du vil avslutte økten?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => stopDialog(false)}>Avbryt</Button>
        <Button onPress={() => stopDialog(true)}>Ja</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ComponentDialog;