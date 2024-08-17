function getTimesTillMidnight() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  let startHour = currentHour;

  if (currentMinutes > 0) {
    startHour += 1;
  }

  const times = [];
  for (let hour = startHour + 1; hour <= 23; hour++) {
    let time = `${hour.toString().padStart(2, "0")}:00`;
    times.push(time);
  }

  return times;
}

export default getTimesTillMidnight;
