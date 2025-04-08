import validator from 'validator';

export const createMessageForTelegram = (name, phone, course) => {
  const currentDate = new Date().toLocaleString('ru-RU');

  return `❗️❗️❗️Новая запись❗️❗️❗️

  👤 Имя клиента:  ${name},

  📞 Телефон:  ${phone},

  🎓 Курс:  ${course},
  
  📅 Дата: ${currentDate}
  `;
};

const normalizePhone = phone => {
  return phone.replace(/[\s\-().]/g, '');
};

export const isDataInvalid = (name, phone, course) => {
  const normalizedPhone = normalizePhone(phone);

  const isNameInvalid = !name || typeof name !== 'string' || name.length > 50;
  const isPhoneInvalid =
    !phone || !validator.isMobilePhone(normalizedPhone, 'any');
  const isCourseInvalid = !course || typeof course !== 'string';

  return isNameInvalid || isPhoneInvalid || isCourseInvalid;
};
