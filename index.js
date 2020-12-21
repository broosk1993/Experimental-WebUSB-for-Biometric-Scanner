function load() { 
    let device;
    navigator.usb.requestDevice({ filters: [{ vendorId: 8122, productId: 17 }] })
    .then(selectedDevice => {
      console.log("selected", selectedDevice)
        device = selectedDevice;
        return device.open(); // Begin a session.
      })
    .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
    .then(() => device.claimInterface(0)) // Request exclusive control over interface #2.
    .then(() => device.controlTransferOut({
        requestType: 'vendor',
        recipient: 'interface',
        request: 1,
        value: 1,
        index: 0})) // Ready to receive data
    .then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
    .then(result => {
      const decoder = new TextDecoder();
      console.log('Received: ' + decoder.decode(result.data));
    })
    .catch(error => { console.error(error); });
}



