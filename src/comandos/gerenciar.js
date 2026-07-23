module.exports = {
  name: 'gerenciar',
  run: (client, message, args) => {
    const nomeCargoPermitido = '𑣲⋆'; 

    if (!message.member.roles.cache.some(role => role.name === nomeCargoPermitido)) {
      return message.reply(`❌ Você precisa ter o cargo **${nomeCargoPermitido}** para gerenciar os horários!`);
    }

    const acao = args[0] ? args[0].toLowerCase() : null;
    const dia = args[1] ? args[1].toLowerCase() : null;
    const hora = args[2];

    const diasValidos = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

    if (!acao || !dia || !diasValidos.includes(dia) || !hora) {
      return message.reply(
        'Formato incorreto! ❌\n\n' +
        '📌 **Como usar:**\n' +
        '• Adicionar: `n!gerenciarhorarios adicionar [dia] [HH:MM]`\n' +
        '• Remover: `n!gerenciarhorarios remover [dia] [HH:MM]`'
      );
    }

    if (!client.gradeHorariosFixos) {
      client.gradeHorariosFixos = {
        segunda: ["14:00", "18:00"],
        terca: ["16:00", "20:00"],
        quarta: ["15:00", "19:00"],
        quinta: ["14:00", "17:00"],
        sexta: ["16:00", "21:00"]
      };
    }

    if (acao === 'adicionar') {
      if (client.gradeHorariosFixos[dia].includes(hora)) {
        // Correção aplicada aqui embaixou 👇
        return message.reply(`⚠️ O horário **${hora}** já existe na **${dia}**!`);
      }

      client.gradeHorariosFixos[dia].push(hora);
      client.gradeHorariosFixos[dia].sort();

      return message.reply(`✅ O horário **${hora}** foi **adicionado** com sucesso na **${dia}**!`);
    }

    if (acao === 'remover') {
      const index = client.gradeHorariosFixos[dia].indexOf(hora);
      if (index === -1) {
        return message.reply(`❌ O horário **${hora}** não foi encontrado na **${dia}**.`);
      }

      client.gradeHorariosFixos[dia].splice(index, 1);
      return message.reply(`🗑️ O horário **${hora}** foi **removido** da **${dia}** com sucesso!`);
    }

    message.reply('Ação desconhecida! Use `adicionar` ou `remover`. ❌');
  }
};
