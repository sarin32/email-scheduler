import { createTransport } from 'nodemailer';
import { EMAIL_SETTINGS } from '../config/index.js';

/**
 * Sends an email.
 */
async function sendEmail({ subject, senderName, text, to = [], cc = [], bcc = [] }) {
  const transporter = createTransport({
    service: EMAIL_SETTINGS.SERVICE_PROVIDER,
    auth: {
      user: EMAIL_SETTINGS.USER_ID,
      pass: EMAIL_SETTINGS.PASSWORD,
    },
  });

  const options = {
    from: `${senderName || 'Sender'} <${EMAIL_SETTINGS.USER_ID}>`,
    subject,
    to,
    cc,
    bcc,
    text,
  };

  const response = await transporter.sendMail(options);

  return response

}

export { sendEmail };
