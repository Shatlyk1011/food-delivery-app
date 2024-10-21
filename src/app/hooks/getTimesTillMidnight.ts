export function getTimesTillMidnight() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  let startHour = currentHour;

  if (currentMinutes > 0) {
    startHour += 1;
  }

  const times = [];
  const timesNoDots = [];
  for (let hour = startHour + 1; hour <= 23; hour++) {
    let time = `${hour.toString().padStart(2, "0")}:00`;
    let timeNoDots = `${hour.toString().padStart(2, "0")}00`;
    times.push(time);
    timesNoDots.push(timeNoDots);
  }

  return { times, timesNoDots };
}

function convertTimeFormat(timeString: string) {
  return timeString.slice(1, 3) + ":" + timeString.slice(3);
}

export function isRestaurantOpen(openTime: string, closeTime: string) {
  if (typeof (openTime && closeTime) === "string") {
    const open = convertTimeFormat(openTime);
    const close = convertTimeFormat(closeTime);

    const now = new Date();

    // Split the times and convert them to Date objects
    const [openHour, openMinute] = open.split(":").map(Number);
    const [closeHour, closeMinute] = close.split(":").map(Number);

    // Create Date objects for today's openTime and closeTime
    const openDate = new Date(now);
    openDate.setHours(openHour, openMinute, 0, 0);

    const closeDate = new Date(now);
    closeDate.setHours(closeHour, closeMinute, 0, 0);

    // If the closeTime is before the openTime, it means the closeTime is the next day
    if (closeDate <= openDate) {
      // If it's after openTime or before closeTime the next day, return true
      if (now >= openDate || now <= closeDate) {
        return true;
      }
    } else {
      // Normal comparison for same-day opening and closing
      if (now >= openDate && now <= closeDate) {
        return true;
      }
    }
  }

  return false;
}
