const util = require('util');
if (typeof util.TextDecoder === 'function') {
  const OriginalTextDecoder = util.TextDecoder;
  util.TextDecoder = class TextDecoder extends OriginalTextDecoder {
    constructor(encoding, options) {
      // Capturamos CUALQUIER codificación extraña y forzamos 'utf-8'
      // 'utf-8' es la única garantizada en el entorno binario de pkg
      if (encoding === 'ascii' || encoding === 'windows-1252' || encoding === 'iso-8859-1') {
        super('utf-8', options);
      } else {
        super(encoding, options);
      }
    }
  };
  global.TextDecoder = util.TextDecoder;
}
const app = require('./app')

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
