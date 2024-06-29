export const dateFormatter = (date: Date | undefined) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .toString();
};

export const getInfoDateFormatter = (
  dateCheckIn: Date | undefined,
  dateCheckOut: Date | undefined
): string => {
  const formattedCheckInDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
  })
    .format(dateCheckIn)
    .toString();
  const formattedCheckOutDate = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    day: "2-digit",
  })
    .format(dateCheckOut)
    .toString();

  const finalDate = `${formattedCheckInDate} - ${formattedCheckOutDate}`;

  return finalDate;
};

export function stringToDate(dateString: string) {
  // Split the string into an array [day, month, year]
  const [day, month, year] = dateString.split("/");
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10) - 1; // Months are 0-based in JavaScript
  const yearNum = parseInt(year, 10);

  // Create a new Date object with the parsed values
  const dateObject = new Date(yearNum, monthNum, dayNum);

  return dateObject;
}
