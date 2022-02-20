import * as dayjs from "dayjs";
import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (time: any) => {
  return dayjs(time).format("MMM, DD YYYY");
};
