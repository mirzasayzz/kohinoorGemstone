import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_APP_PASSWORD
    },
    logger: true,
    debug: true
  });

  // Email options
  const fromAddress = `${process.env.FROM_NAME || 'Kohinoor Admin'} <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL}>`;
  const mailOptions = {
    from: fromAddress,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message
  };

  try {
    console.log('[Email] Transport host:', process.env.SMTP_HOST || 'smtp.gmail.com', 'port:', parseInt(process.env.SMTP_PORT) || 587);
    console.log('[Email] From:', fromAddress, 'To:', options.email, 'Subject:', options.subject);
    // Verify connection configuration
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] Sent OK. MessageId:', info.messageId);
    return info;
  } catch (err) {
    console.error('[Email] Send failed:', err && err.message ? err.message : err);
    throw err;
  }
};

// Password reset email template
export const sendPasswordResetEmail = async (email, resetUrl, userName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #111111; border-radius: 12px; border: 1px solid #242424;">
              <tr>
                <td style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #242424;">
                  <div style="width: 60px; height: 60px; background: #ffffff; border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 28px;">💎</span>
                  </div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Kohinoor Admin</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px; font-weight: 600;">Password Reset Request</h2>
                  <p style="color: #a3a3a3; margin: 0 0 24px; font-size: 15px; line-height: 1.6;">
                    Hi ${userName || 'Admin'},<br><br>
                    We received a request to reset your password. Click the button below to create a new password.
                  </p>
                  <a href="${resetUrl}" style="display: inline-block; background: #ffffff; color: #0a0a0a; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                    Reset Password
                  </a>
                  <p style="color: #737373; margin: 24px 0 0; font-size: 13px; line-height: 1.6;">
                    This link will expire in <strong style="color: #a3a3a3;">30 minutes</strong>.<br><br>
                    If you didn't request this, you can safely ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #242424; text-align: center;">
                  <p style="color: #525252; margin: 0; font-size: 12px;">
                    © ${new Date().getFullYear()} Kohinoor Gemstone. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmail({
    email,
    subject: 'Password Reset - Kohinoor Admin',
    html
  });
};

// Password changed confirmation email
export const sendPasswordChangedEmail = async (email, userName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #111111; border-radius: 12px; border: 1px solid #242424;">
              <tr>
                <td style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #242424;">
                  <div style="width: 60px; height: 60px; background: #22c55e; border-radius: 12px; margin: 0 auto 20px;">
                    <span style="font-size: 28px; line-height: 60px;">✓</span>
                  </div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Password Changed</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #a3a3a3; margin: 0 0 16px; font-size: 15px; line-height: 1.6;">
                    Hi ${userName || 'Admin'},<br><br>
                    Your password has been successfully changed. You can now log in with your new password.
                  </p>
                  <p style="color: #737373; margin: 16px 0 0; font-size: 13px; line-height: 1.6;">
                    If you didn't make this change, please contact support immediately.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #242424; text-align: center;">
                  <p style="color: #525252; margin: 0; font-size: 12px;">
                    © ${new Date().getFullYear()} Kohinoor Gemstone. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmail({
    email,
    subject: 'Password Changed - Kohinoor Admin',
    html
  });
};

export default sendEmail;
