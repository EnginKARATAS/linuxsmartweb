const DBus = require('dbus'); // Adjust the path as necessary

const bus = DBus.getBus('session'); // Use 'system' if your server is on the system bus

const serviceName = 'in.softprayog.add_server';
const objectPath = '/in/softprayog/adder';
const interfaceName = 'in.softprayog.dbus_example';

bus.getInterface(serviceName, objectPath, interfaceName, (err, iface) => {
    if (err) {
        console.error('Error getting interface:', err);
        return;
    }

    if (!iface.add_numbers) {
        console.error('Method add_numbers not found on interface');
        return;
    }

    // Call the add_numbers method
    iface.add_numbers('44 44', { timeout: 1000 }, (err, result) => {
        if (err) {
            console.error('Error calling method:', err);
            return;
        }

        console.log('Result from server:', result);
    });
});
