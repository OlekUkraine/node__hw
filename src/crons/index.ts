import { removeOldTokens } from "./remove-old-tokens.cron";
import { returnUsers } from "./returning-users.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  returnUsers.start();
};
