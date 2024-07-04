import EmailModel from '../models/email.model';
import { sendEmail } from '../emailService';

export const email = async (req, res) => {
    const { to, subject, text } = req.body;

    const result = await sendEmail(to, subject, text);

    if (result.success) {
        const email = new EmailModel({ to, subject, text });
        await email.save();
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};
