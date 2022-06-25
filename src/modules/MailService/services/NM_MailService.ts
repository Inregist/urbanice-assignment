import nodemailer, { Transporter } from 'nodemailer';
import { z } from 'zod';

const MailMessage = z.object({
  from: z.string(),
  to: z.string(),
  message: z.string(),
});

type MailMessage = z.infer<typeof MailMessage>;

const NM_InitInput = z.object({
  user: z.string(),
  pass: z.string(),
});
type NM_InitInput = z.infer<typeof NM_InitInput>;

let transporter: Transporter;

const NM_MailService = {
  init: ({ user, pass }: NM_InitInput) => {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  },
  send: async (mailMessage: MailMessage) => {
    MailMessage.parse(mailMessage);
    const { from, to, message: text } = mailMessage;
    try {
      const info = await transporter.sendMail({
        from,
        to,
        text,
      });
      return info;
    } catch (error: any) {
      if (error.response) {
        throw new Error(JSON.stringify(error));
      }
    }
  },
};

export default NM_MailService;
