// Used to send emails


/**
 * 
 * 
 * TODO => This is not currently working as outlook have discontinued 
 * this form of authentication??
 * 
 * 
 */


import nodemailer, { Transporter } from "nodemailer";

const sendEmail = (to: string, subject: string, message: string) => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log(`Nodemailer error: ${error}`);
    else console.log(`Nodemail info: ${JSON.stringify(info)}`);
  });
};

export { sendEmail };
