export const FormatTime = (input: string) => {
  const raw_date = new Date(input);

  const hours = raw_date.getHours();
  const minutes = raw_date.getMinutes().toString().padStart(2, "0");

  let formatted_hours = hours % 12;
  if (formatted_hours === 0) {
    formatted_hours = 12;
  }
  const period = hours < 12 ? "AM" : "PM";

  const formatted_time = `${formatted_hours}:${minutes} ${period}`;

  return formatted_time;
};
