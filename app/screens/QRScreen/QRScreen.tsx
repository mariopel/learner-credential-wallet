import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { PresentationError } from '../../types/presentation';
import { ConfirmModal } from '../../components';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { credentialsFromQrText, isVpqr } from '../../lib/decode';
import { NavHeader } from '../../components';
import { QRScreenProps } from './QRScreen.d';
import styles from './QRScreen.styles';

export default function QRScreen({ navigation }: QRScreenProps): JSX.Element {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  function Instructions(): JSX.Element {
    return (
      <Text style={styles.instructionText}>
        Scan a QR code from your issuer to request your credentials.
      </Text>
    );
  }

  async function onRead({ data: text }: BarCodeReadEvent) {
    if (!isVpqr(text)) {
      setErrorModalOpen(true);
      setErrorMessage('The QR code was read, but no credentials were found');

      return;
    }

    await credentialsFromQrText(text)
      .then((credentials) => {
        dispatch(stageCredentials(credentials));
        navigation.navigate('ApproveCredentialsScreen');
      })
      .catch((err) => {
        console.warn(err);
        setErrorModalOpen(true);

        if (Object.values(PresentationError).includes(err.message)) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('An error was encountered when parsing this QR code.');
        }
      });
  }

  return (
    <View style={styles.scannerBody}>
      <NavHeader title="Scan QR" goBack={navigation.goBack} />
      <QRCodeScanner
        onRead={onRead}
        topContent={<Instructions />}
        topViewStyle={styles.instructionContainer}
        bottomViewStyle={styles.emptyContainer}
        cameraStyle={styles.cameraStyle}
        markerStyle={[styles.markerStyle, {
          width: width * 0.9,
          height: width * 0.9,
        }]}
        showMarker
      />
      <ConfirmModal
        open={errorModalOpen}
        onRequestClose={() => setErrorModalOpen(!errorModalOpen)}
        onConfirm={() => navigation.goBack()}
        confirmText="Okay"
        cancelButton={false}
        title={errorMessage}
      />
    </View>
  );
}
