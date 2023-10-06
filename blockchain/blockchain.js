const sha256 = require('sha256');

function Blockchain(){            //Construtor
  this.chain = [];                //A Blockchain
  this.transacoesPendentes = [];  //Declaracao das transacoes a serem validadas

  this.criaNovoBloco(0,'0','0')  // Bloco genesis
};

 // Cria/insere um novo bloco na Blockchain
Blockchain.prototype.criaNovoBloco = function (nonce,HashAnterior,hash) {
  const novoBloco = {
    index:this.chain.length + 1,
    timestamp: Date.now(),                  //Data da criacao do Bloco
    transacoes: this.transacoesPendentes,  //Transacoes validadas
    nonce: nonce,                         //Numero de iteracoes ate o bloco ser criado
    hash: hash,                          //Hash do bloco criado
    HashAnterior: HashAnterior          //Hash do bloco criado anteriormente
  };

  this.chain.push(novoBloco);
  this.transacoesPendentes = [];

  return novoBloco;
};

// Retorna o ultimo bloco criado/inserido
Blockchain.prototype.getLastBloco = function () {
  return this.chain[this.chain.length - 1];
};

//Cria/insere uma nova transacao em transacoesPendentes, com quantidade remetente e destinatario, respectivamente
Blockchain.prototype.criaNovaTransacao = function (qtde,remet,dest) {
  const novaTransacao = {
    qtde:qtde,
    remet:remet,
    dest:dest
  };
  this.transacoesPendentes.push(novaTransacao);

  return this.getLastBloco()['index'] + 1;
};

 //Usa o sha256 para fazer o hashing do bloco com os dados em String para ser mais didatico
Blockchain.prototype.hashing = function (HashAnterior, dadosBloco, nonce) {
  const dadosString = HashAnterior + nonce.toString() + JSON.stringify(dadosBloco);
  const hash = sha256(dadosString);
  return hash;
};

// Proof-of-work usando a funcao hashing criada
Blockchain.prototype.proofOfWork = function (HashAnterior, dadosBloco) {
  let nonce = 0;
  let hash = this.hashing(HashAnterior, dadosBloco, nonce);
  while(hash.substring(0,4) !== '0000'){
    nonce++;
    hash = this.hashing(HashAnterior, dadosBloco, nonce);
  }
  return nonce;
};

module.exports = Blockchain;
