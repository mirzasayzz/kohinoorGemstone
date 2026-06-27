import nodemailer from 'nodemailer';

// Create reusable transporter
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    });
  }
  return transporter;
};

// Simple OTP template
const otpTemplate = (otp) => `
<div style="font-family:Arial;max-width:400px;margin:auto;background:#1a1a1a;border-radius:12px;padding:30px;text-align:center">
  <h1 style="color:#f59e0b;margin:0 0 20px">Kohinoor</h1>
  <p style="color:#888;margin:0 0 15px">Your verification code:</p>
  <div style="background:#2a2a2a;border-radius:8px;padding:20px;margin:15px 0">
    <span style="font-size:32px;font-weight:bold;color:#f59e0b;letter-spacing:8px">${otp}</span>
  </div>
  <p style="color:#666;font-size:12px">Valid for 10 minutes</p>
</div>`;

// Welcome template
const welcomeTemplate = (name) => `
<div style="font-family:Arial;max-width:500px;margin:auto;background:#1a1a1a;border-radius:12px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#f59e0b,#ea580c);padding:30px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:28px">💎 Kohinoor Gemstone</h1>
    <p style="color:#fff;opacity:0.9;margin:10px 0 0;font-size:14px">Trusted by tradition, chosen for quality</p>
  </div>
  
  <div style="padding:30px;text-align:center">
    <h2 style="color:#fff;margin:0 0 10px">Welcome, ${name}! 🎉</h2>
    <p style="color:#888;margin:0 0 20px">Your account has been created successfully.</p>
    
    <div style="background:#2a2a2a;border-radius:8px;padding:20px;margin:20px 0;text-align:left">
      <h3 style="color:#f59e0b;margin:0 0 15px;font-size:16px">✨ Popular Gemstones</h3>
      <p style="color:#ccc;margin:0 0 8px;font-size:14px">💙 <strong>Neelam</strong> (Blue Sapphire) - Saturn stone for success</p>
      <p style="color:#ccc;margin:0 0 8px;font-size:14px">💛 <strong>Pukhraj</strong> (Yellow Sapphire) - Jupiter stone for wisdom</p>
      <p style="color:#ccc;margin:0 0 8px;font-size:14px">❤️ <strong>Ruby</strong> (Manik) - Sun stone for confidence</p>
      <p style="color:#ccc;margin:0 0 8px;font-size:14px">💚 <strong>Emerald</strong> (Panna) - Mercury stone for intellect</p>
      <p style="color:#ccc;margin:0;font-size:14px">🤍 <strong>Pearl</strong> (Moti) - Moon stone for peace</p>
    </div>
    
    <a href="https://kohinoorgemstone.com" style="display:inline-block;background:#f59e0b;color:#000;font-weight:bold;padding:12px 30px;border-radius:8px;text-decoration:none;margin:10px 0">Explore Gemstones</a>
    
    <div style="margin-top:25px;padding-top:20px;border-top:1px solid #333">
      <h4 style="color:#f59e0b;margin:0 0 10px;font-size:14px">📍 Visit Our Store</h4>
      <p style="color:#888;margin:0;font-size:13px;line-height:1.6">
        <strong style="color:#ccc">Kohinoor Gemstone</strong><br>
        Shahbad, Deewan Khana, Opposite Dr. Deewedi<br>
        Bareilly, Uttar Pradesh - 243001<br>
        <strong style="color:#ccc">Expert:</strong> Ahad Beg
      </p>
    </div>
    
    <div style="margin-top:20px">
      <p style="color:#666;font-size:12px;margin:0">
        Serving customers for 2 generations with authentic gemstones
      </p>
    </div>
  </div>
</div>`;

// Send email
export const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_APP_PASSWORD) {
      console.log('No SMTP config - skipping email');
      return { success: true, skipped: true };
    }

    const from = '"' + (process.env.FROM_NAME || 'Kohinoor') + '" <' + (process.env.FROM_EMAIL || process.env.SMTP_EMAIL) + '>';
    console.log('Sending email to:', to);

    const info = await getTransporter().sendMail({ from, to, subject, html });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Send verification OTP
export const sendVerificationOTP = async (email, name, otp) => {
  return sendEmail(email, 'Your Kohinoor OTP: ' + otp, otpTemplate(otp));
};

// Send password reset OTP
export const sendPasswordResetOTP = async (email, name, otp) => {
  return sendEmail(email, 'Reset your Kohinoor password', otpTemplate(otp));
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  return sendEmail(email, 'Welcome to Kohinoor!', welcomeTemplate(name));
};

export default { sendEmail, sendVerificationOTP, sendPasswordResetOTP, sendWelcomeEmail };
