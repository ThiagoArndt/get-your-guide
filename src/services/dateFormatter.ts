export const dateFormatter = (date:Date | undefined) => {
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date).toString();
}

export const getInfoDateFormatter = (dateCheckIn:Date | undefined, dateCheckOut:Date | undefined):string => {
   const formattedCheckInDate = new Intl.DateTimeFormat('pt-BR', {day: '2-digit'}).format(dateCheckIn).toString();
   const formattedCheckOutDate = new Intl.DateTimeFormat('pt-BR', {month: 'long',day: '2-digit'}).format(dateCheckOut).toString();

   const finalDate =  `${formattedCheckInDate} - ${formattedCheckOutDate}`

   return finalDate;
}