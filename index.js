document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
    const barcodeDiv = document.getElementById('barcode');

    NIMMSTA.onReady(() => {
        const connectionManager = new NimmstaConnectionManager();

        connectionManager.addEventListener('deviceConnected', (event) => {
            const device = event.device;
            statusDiv.textContent = 'Connected to device: ' + device.address;

            device.addEventListener('scan', (event) => {
                const barcode = event.barcode;
                barcodeDiv.textContent = 'Scanned barcode: ' + barcode;
            });
        });

        connectionManager.addEventListener('deviceDisconnected', () => {
            statusDiv.textContent = 'Device disconnected. Please reconnect.';
        });

        if (connectionManager.devices.length > 0) {
            const device = connectionManager.devices[0];
            statusDiv.textContent = 'Connected to device: ' + device.address;

            device.addEventListener('scan', (event) => {
                const barcode = event.barcode;
                barcodeDiv.textContent = 'Scanned barcode: ' + barcode;
            });
        } else {
            connectionManager.displayConnectActivity();
            statusDiv.textContent = 'Please connect a NIMMSTA device.';
        }
    });

    NIMMSTA.onError((error) => {
        statusDiv.textContent = 'Error: ' + error.message;
        console.error('NIMMSTA Error:', error);
    });

    window.addEventListener('error', (event) => {
        statusDiv.textContent = 'Error: ' + event.message;
        console.error('Window Error:', event);
    });
});