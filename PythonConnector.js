const spawn = require('child_process').spawn;
const path = require('path');
const zerorpc = require('zerorpc');
//console.log('zeropc 1 is: '+ zerorpc);

const Utils = require('./Utils.js');
//console.log(zerorpc);
//console.log('*********************************')

const TIMEOUT = 600; // in seconds (adjust as per how long your server calls can take)
const IP = '127.0.0.1';
const PORT = '4242';

class PythonConnector {
    static server() {
        if (!PythonConnector.connected) {
            console.log('PythonConnector – making a new connection to the python layer');
            PythonConnector.zerorpcProcess = spawn('python', ['-u', path.join(__dirname, 'PythonServer.py')]);
             PythonConnector.zerorpcProcess.stdout.on('data', function(data) {
            //     console.info('pythonnn:', data.toString());
            //     console.log('python:', data.toString());
            });
            // PythonConnector.zerorpcProcess.stderr.on('data', function(data) {
            //     console.error('python:', data.toString());
            // });
             PythonConnector.zerorpc = new zerorpc.Client({'timeout': TIMEOUT, 'heartbeatInterval': TIMEOUT*1000});
             PythonConnector.zerorpc.connect('tcp://' + IP + ':' + PORT);
            PythonConnector.connected = true;
        }
        return PythonConnector.zerorpc;
    }

    static async invoke(method, ...args) {
        try {
            //console.log('method is: '+ method);
            console.log('args is: '+ args);

            const zerorpc = PythonConnector.server();
            //console.log('zeropc 2 is: '+ zerorpc)
            return await Utils.promisify(zerorpc.invoke, zerorpc, method, ...args);
        }
        catch (e) {
            console.log('errorrrrrrr')
            return Promise.reject(e)
        }
    }
}

module.exports = PythonConnector;
