module.exports = {
  name: 'liberar',
  run: (client, message, args) => {
    // 🛡️ Apenas quem tem cargo de Staff pode liberar horários
    const nomeCargoPermitido = '𑣲⋆'; 

    if (!message.member.roles.cache.some(role => role.name === nomeCargoPermitido)) {
      return message.reply(`❌ Você precisa ter o cargo **${nomeCargoPermitido}** para liberar horários!`);
    }

    const dia = args[0] ? args[0].toLowerCase() : null;
    const hora = args[1];

    const diasValidos = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

    if (!dia || !diasValidos.includes(dia) || !hora) {
      return message.reply(
        'Formato incorreto! ❌\n\n' +
        '📌 **Como usar:** `n!liberar [dia] [HH:MM]`\n' +
        '💡 **Exemplo:** `n!liberar quinta 14:00`'
      );
    }

    const chaveUnica = `${dia}-${hora}`;

    if (!client.agendamentosGerais || !client.agendamentosGerais.has(chaveUnica)) {
      return message.reply(`⚠️ O horário das **${hora}** na **${dia}** já está livre ou não possui agendamento.`);
    }

    // Remove o agendamento da memória
    client.agendamentosGerais.delete(chaveUnica);

    message.reply(`✅ O horário das **${hora}** na **${dia}** foi **liberado** com sucesso (voltou a ficar disponível 🟢)!`);
  }
};
