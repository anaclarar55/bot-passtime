module.exports = {
  name: 'agendar',
  run: (client, message, args) => {
    const nomeCargoPermitido = '𑣲⋆';
    const dia = args[0] ? args[0].toLowerCase() : null;
    const hora = args[1];
    const donoDaPostagem = args.slice(2).join(' ');

    const diasValidos = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

    // Se faltar informação
    if (!dia || !diasValidos.includes(dia) || !hora || !donoDaPostagem) {
      return message.reply(
        '# :pur2: Formato incorreto ou incompleto!\n\n' +
        '> :pur6: **Como usar:** `n!agendar [dia] [hora] [menção]`\n' +
        '> :pur1: **Exemplo:** `n!agendar segunda 14:00` <@1451734303594774588>'
      );
    }

    // Inicializa a grade padrão se não existir no client
    if (!client.gradeHorariosFixos) {
      client.gradeHorariosFixos = {
        segunda: ["14:00", "18:00"],
        terca: ["16:00", "20:00"],
        quarta: ["15:00", "19:00"],
        quinta: ["14:00", "17:00"],
        sexta: ["16:00", "21:00"]
      };
    }

    // 🔒 TRAVA: Verifica se o horário existe na grade daquele dia
    const horariosDoDia = client.gradeHorariosFixos[dia] || [];
    if (!horariosDoDia.includes(hora)) {
      return message.reply(
        `:pur2: O horário **${hora}** não existe para **${dia}-feira**!\n` +
        `:pur3: Horários disponíveis neste dia: **${horariosDoDia.join(', ')}**`
      );
    }

    if (!client.agendamentosGerais) {
      client.agendamentosGerais = new Map();
    }

    const chaveUnica = `${dia}-${hora}`;
    client.agendamentosGerais.set(chaveUnica, donoDaPostagem);

    message.reply(`:pur11: Anotado! Na **${dia}** às **${hora}**, o horário foi reservado para **${donoDaPostagem}**.`);
  }
};
