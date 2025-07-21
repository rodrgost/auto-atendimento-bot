const { create } = require('venom-bot');
const { responderComIA } = require('./ia');
const fs = require('fs');
const respostas = require('./config/respostas.json');

create().then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    if (!message.body || message.isGroupMsg) return;

    const texto = message.body.toLowerCase();
    const numero = message.from;

    // Busca em respostas rápidas
    const respostaPadrao = Object.keys(respostas).find((chave) =>
      texto.includes(chave)
    );

    let respostaFinal = respostaPadrao
      ? respostas[respostaPadrao]
      : await responderComIA(texto); // IA se não encontrar resposta

    client.sendText(numero, respostaFinal);
    salvarLog(numero, texto, respostaFinal);
  });
}

function salvarLog(numero, entrada, resposta) {
  const log = `[${new Date().toISOString()}] ${numero} >> ${entrada} // BOT >> ${resposta}\n`;
  fs.appendFileSync('./logs/atendimento.log', log);
}
