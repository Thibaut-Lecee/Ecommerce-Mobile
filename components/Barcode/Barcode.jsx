import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Barcode = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
        <View style={styles.container1}>
            {open && (
                <>

                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            </>
                )}

            </View>
            <View style={styles.container2}>
                {!open && (<Text style={{color: 'black'}}>En attente de Scanner</Text> )}
            <Button title={!open ? "Open Scanner" : 'Close scanner'} style={{justifyContent: 'flex-end'}} onPress={() => setOpen(!open)} />
                {scanned  && open && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
   container1: {
       width: "100%",
       height: 500,
       flexShrink: 0,
       backgroundColor: '#191830',
       flex: 1,
   },
    container2: {
        width: "100%",
        height: 100,
        flexShrink: 0,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        flex: 1,
    }

});

export default Barcode;