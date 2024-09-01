interface DateUtils {
  formatDateWithoutTime: (date: Date) => string;
  formatDateWithTime: (date: Date) => string;
  formatTime: (date: Date) => string;
  formatDateToYYYYMMDD: (date: Date) => string;
  getTimeAgo: (date: Date) => string;
}

const useDateUtils = (): DateUtils => {
  const intervals: { [key: number]: string } = {
    31536000: "year",
    2592000: "month",
    604800: "week",
    86400: "day",
    3600: "hour",
    60: "minute",
  };

  const formatDateWithoutTime = (date: Date) => {
    return date.toLocaleString("fa-IR").split(", ")[0];
  };

  const formatDateWithTime = (date: Date) => {
    return date.toLocaleString("fa-IR");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fa-IR");
  };

  const formatDateToYYYYMMDD = (date: Date) => {
    return date
      .toLocaleString("fa-IR")
      .split(" ")[0]
      .replace(/\//g, "-")
      .replaceAll(",", "");
  };

  const getTimeAgo = (date: Date) => {
    let secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);

    if (secondsAgo < 60) {
      return "همین آلان";
    }

    let result = "";

    for (const [intervalSeconds, intervalText] of Object.entries(
      intervals
    ).reverse()) {
      const interval = parseInt(intervalSeconds, 10);
      const currentIntervalCount = Math.floor(secondsAgo / interval);
      if (currentIntervalCount > 0 && result === "") {
        result = `${result} ${currentIntervalCount} ${intervalText} `;
      }
      secondsAgo = secondsAgo % interval;
    }
    return result + "قبل";
  };

  return {
    formatDateWithoutTime,
    formatDateWithTime,
    formatTime,
    formatDateToYYYYMMDD,
    getTimeAgo,
  };
};

export default useDateUtils;
