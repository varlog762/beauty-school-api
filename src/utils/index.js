export const createMessageForTelegram = (name, phone, course) => {
  const currentDate = new Date().toLocaleString('ru-RU');

  return `❗️❗️❗️Новая запись❗️❗️❗️

  👤 Имя клиента:  ${name},

  📞 Телефон:  ${phone},

  🎓 Курс:  ${course},
  
  📅 Дата: ${currentDate}
  `;
};
