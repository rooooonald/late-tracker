const timeFormatter = {
  date(datetime) {
    const formattedDate = new Date(datetime).toLocaleString("en-CA", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  },
  time(datetime) {
    const formattedTime = new Date(datetime).toLocaleString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedTime;
  },
};

export default timeFormatter;
