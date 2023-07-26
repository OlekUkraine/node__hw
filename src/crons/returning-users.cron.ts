import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailActions } from "../enums";
import { User } from "../models";
import { mailService } from "../services";

dayjs.extend(utc);

const returnTheUsers = async () => {
  const previousMonth = dayjs().utc().subtract(30, "days");

  const wasNotForLongTime = await User.find({
    createdAt: { $lte: previousMonth },
  });

  wasNotForLongTime.map((user) => {
    mailService.sendMail(user.email, EEmailActions.COME_BACK, {
      name: user.name,
    });
  });
};

export const returnUsers = new CronJob("0 4 * * *", returnTheUsers);
