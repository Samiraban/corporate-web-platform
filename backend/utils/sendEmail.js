const nodemailer = require('nodemailer');

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

/**
 * Sends an email. Never throws to the caller in a way that should block a
 * request — callers should .catch() this and log, since notification
 * failures shouldn't fail the underlying user action (e.g. a contact
 * form submission should still succeed even if the notify email fails).
 */
const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP not configured — skipping email send:', subject);
    return;
  }
  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
