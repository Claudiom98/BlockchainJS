const Blockchain = require('./Blockchain');

const moeda = new Blockchain();

const HashAnterior = 'IHFHASO98A9FEH9EF';
const dadosBloco = [
  {
    qtde:48,
    remet:'PFOSAKFASPO',
    dest:'J9QR8R9Q'
  },
  {
    qtde: 86,
    remet:'39JJR930',
    dest: '3R3F3F44F'
  },
  {
    qtde: 78,
    remet: '9SJ98FS8A',
    dest: 'ASFJ980A98J'
  }
];



console.log(moeda.proofOfWork(HashAnterior, dadosBloco));
