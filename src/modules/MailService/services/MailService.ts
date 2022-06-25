import sg from '@sendgrid/mail';
import { z } from 'zod';

const MailMessage = z.object({
  from: z.string().email(),
  to: z.string().email(),
  message: z.string(),
  templateID: z.string().optional(),
});

type MailMessage = z.infer<typeof MailMessage>;

const MailService = {
  init: (apiKey: string) => {
    sg.setApiKey(apiKey);
  },
  send: async (mailMessage: MailMessage) => {
    MailMessage.parse(mailMessage);
    const { from, to, message: text, templateID: templateId } = mailMessage;
    try {
      await sg.send({
        from,
        to,
        text,
        templateId,
      });
    } catch (error: any) {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.body));
      }
    }
  },
};

export default MailService;
