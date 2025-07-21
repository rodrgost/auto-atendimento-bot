const axios = require('axios');

async function responderComIA(pergunta) {
  try {
    const res = await axios.post('https://g4f-api.zxq.co/api/completion', {
      messages: [
        { role: 'system', content: 'Você é um atendente simpático e breve.' },
        { role: 'user', content: pergunta }
      ],
      model: 'gpt-3.5-turbo'
    });

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Erro na IA:', err.message);
    return 'Desculpe, não entendi. Poderia repetir?';
  }
}

module.exports = { responderComIA };
