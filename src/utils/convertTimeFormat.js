export const convertTimeFormat = (inputTime) => {
  const date = new Date(inputTime);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Пример использования
const inputTime = "1939-04-24T00:00:00.000Z";
const outputTime = convertTimeFormat(inputTime);
console.log(outputTime); // Выведет: 1939-04-24
