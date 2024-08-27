document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
    const barcodeDiv = document.getElementById('barcode');

    NIMMSTA.onReady(() => {
        const connectionManager = new NimmstaConnectionManager();

        connectionManager.on('deviceConnected', (device) => {
            statusDiv.textContent = 'Connected to device: ' + device.address;

            device.on('scan', (barcode) => {
                barcodeDiv.textContent = 'Scanned barcode: ' + barcode;
            });
        });

        connectionManager.on('deviceDisconnected', () => {
            statusDiv.textContent = 'Device disconnected. Please reconnect.';
        });

        if (connectionManager.devices.length > 0) {
            const device = connectionManager.devices[0];
            statusDiv.textContent = 'Connected to device: ' + device.address;

            device.on('scan', (barcode) => {
                barcodeDiv.textContent = 'Scanned barcode: ' + barcode;
            });
        } else {
            connectionManager.displayConnectActivity();
            statusDiv.textContent = 'Please connect a NIMMSTA device.';
        }
    });

    NIMMSTA.onError((error) => {
        statusDiv.textContent = 'Error: ' + error.message;
    });
});