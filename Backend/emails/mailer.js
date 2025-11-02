const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
  secure: false,
  auth: process.env.EMAIL_USER
    ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS || '' }
    : undefined,
});

async function sendMail({ to, subject, text, html, from }) {
  const info = await transporter.sendMail({
    from: from || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@example.com',
    to,
    subject,
    text,
    html,
  });
  return info;
}

module.exports = { transporter, sendMail };
