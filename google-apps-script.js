// Этот скрипт нужно вставить в Google Apps Script
// Инструкция по установке:
// 1. Откройте вашу Google Таблицу
// 2. Нажмите "Расширения" → "Apps Script"
// 3. Удалите весь код по умолчанию
// 4. Скопируйте и вставьте весь код ниже
// 5. ВАЖНО: Замените YOUR_SPREADSHEET_ID на ID вашей таблицы (строка 16)
// 6. Нажмите "Развернуть" → "Новое развертывание"
// 7. Выберите тип: "Веб-приложение"
// 8. Описание: "Contact & Order Form Handler"
// 9. Выполнять от имени: "Я"
// 10. У кого есть доступ: "Все"
// 11. Нажмите "Развернуть"
// 12. Скопируйте URL веб-приложения (он будет нужен для сайта)

// НАСТРОЙКИ
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ЗАМЕНИТЕ на ID вашей таблицы

function doPost(e) {
  try {
    // Парсим данные из запроса
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType || 'contact'; // Тип формы: contact, order, commission, donation

    // Обрабатываем в зависимости от типа формы
    if (formType === 'contact') {
      return handleContactForm(data);
    } else if (formType === 'order') {
      return handleOrderForm(data);
    } else if (formType === 'commission') {
      return handleCommissionForm(data);
    } else if (formType === 'donation') {
      return handleDonationForm(data);
    } else {
      throw new Error('Unknown form type');
    }

  } catch (error) {
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Обработка контактной формы
function handleContactForm(data) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = getOrCreateSheet(spreadsheet, 'Contacts');

  // Добавляем заголовки, если их нет
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date & Time', 'First Name', 'Last Name', 'Email', 'Message']);
  }

  var timestamp = new Date();

  // Форматируем дату и время
  var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss');

  // Добавляем новую строку с данными
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setNumberFormat('@').setValue(formattedDate);
  sheet.getRange(row, 2).setValue(data.firstName || '');
  sheet.getRange(row, 3).setValue(data.lastName || '');
  sheet.getRange(row, 4).setValue(data.email);
  sheet.getRange(row, 5).setValue(data.message);

  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Message sent'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Обработка формы заказа
function handleOrderForm(data) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = getOrCreateSheet(spreadsheet, 'Orders');

  // Добавляем заголовки, если их нет
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date & Time', 'Name', 'Email', 'Phone', 'Address', 'Order', 'Total']);
  }

  var timestamp = new Date();

  // Форматируем дату и время
  var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss');

  // Добавляем новую строку с данными
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setNumberFormat('@').setValue(formattedDate); // Дата как текст
  sheet.getRange(row, 2).setValue(data.name);
  sheet.getRange(row, 3).setValue(data.email);
  sheet.getRange(row, 4).setNumberFormat('@').setValue(data.phone); // Телефон как текст
  sheet.getRange(row, 5).setValue(data.address);
  sheet.getRange(row, 6).setValue(data.orderDetails);
  sheet.getRange(row, 7).setValue(data.total + '$');

  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Order placed'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Обработка формы комиссий - сохраняет в лист Commissions
function handleCommissionForm(data) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = getOrCreateSheet(spreadsheet, 'Commissions');

  // Добавляем заголовки, если их нет
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date & Time', 'Email']);
  }

  var timestamp = new Date();

  // Форматируем дату и время
  var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss');

  // Добавляем новую строку с данными
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setNumberFormat('@').setValue(formattedDate);
  sheet.getRange(row, 2).setValue(data.email);

  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Request sent'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Обработка формы пожертвований - сохраняет в лист Donations
function handleDonationForm(data) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = getOrCreateSheet(spreadsheet, 'Donations');

  // Добавляем заголовки, если их нет
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date & Time', 'Name', 'Amount', 'Message']);
  }

  var timestamp = new Date();

  // Форматируем дату и время
  var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss');

  // Добавляем новую строку с данными
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setNumberFormat('@').setValue(formattedDate);
  sheet.getRange(row, 2).setValue(data.name || 'Anonymous');
  sheet.getRange(row, 3).setValue(data.amount + '$');
  sheet.getRange(row, 4).setValue(data.message || '');

  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Donation recorded'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Получить или создать лист
function getOrCreateSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

// Тестовая функция для проверки (необязательно)
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Тест',
        lastName: 'Тестов',
        email: 'test@example.com',
        message: 'Тестовое сообщение'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
