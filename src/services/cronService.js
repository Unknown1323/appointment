const { CronJob } = require("cron");
const moment = require("moment");
const fs = require("fs");

async function scheduleReminderJobs(user, slot, doctor) {
  const dateNow = new Date();
  const registeredDate = new Date(slot);
  if (dateNow.getDate() < registeredDate.getDate()) {
    const oneDayBefore = moment(registeredDate)
      .subtract(1, "day")
      .add(1, "minutes")
      .format("ss mm HH DD MM *");
    const oneDayBeforeJob = new CronJob(oneDayBefore, () => {
      const message = `| Привет ${user.name}! Напоминаем что вы записаны к ${
        doctor.spec
      } завтра в ${moment(registeredDate).format("YYYY-MM-DD HH:mm")}`;
      writeToLogFile(message);
    });
    oneDayBeforeJob.start();
  }

  if (dateNow.getHours() <= registeredDate.getHours()) {
    const twoHoursBefore = moment(registeredDate)
      .subtract(2, "hours")
      .add(1, "minutes")
      .format("ss mm HH DD MM *");
    const twoHoursBeforeJob = new CronJob(twoHoursBefore, () => {
      const message = `| Привет ${user.name}! Вам через 2 часа к ${
        doctor.spec
      } в ${moment(registeredDate).format("YYYY-MM-DD HH:mm")}`;
      writeToLogFile(message);
    });
    twoHoursBeforeJob.start();
  }
}

function writeToLogFile(message) {
  const logFilePath = "src/logs/info.log";
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Помилка запису до файлу:", err);
    } else {
      console.log("Повідомлення успішно записано у файл");
    }
  });
}

module.exports = {
  scheduleReminderJobs,
};
