import * as dayjs from "dayjs";

export const formatTime = (time: any) => {
  const val = dayjs(time).format("MMM, DD YYYY");
  return val;
};
