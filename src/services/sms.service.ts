import { Twilio } from "twilio";

import { configs } from "../configs";
import {ESmsActions} from "../enums";
import {smsTemplates} from "../constants";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_TOKEN
    )
  ) {}

  public async sendSms(phone: string, actionType: ESmsActions) {
    try {
      const template = smsTemplates[actionType];
      const data = await this.client.messages.create({
        body: template,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
        to: phone,
      });

      console.log("twilio sms: ", data);
    } catch (e) {
      console.error("error >>> ", e.message);
    }
  }
}

export const smsService = new SmsService();
