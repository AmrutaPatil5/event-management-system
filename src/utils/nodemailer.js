import nodemailer from "nodemailer";

/**
 * Create Nodemailer transporter for Mailtrap
 * Uses environment variables for configuration
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "2525"),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 * @param {string} text - Plain text content (optional)
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendEmail = async (to, subject, html, text = "") => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Event Management System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML tags for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

/**
 * Send welcome email to new user
 * @param {string} email - User email
 * @param {string} name - User name
 * @returns {Promise}
 */
export const sendWelcomeEmail = async (email, name) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Event Management System!</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Welcome to our Event Management System! We're excited to have you on board.</p>
          <p>You can now browse and register for events happening in your college.</p>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Best regards,<br>The Event Management Team</p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(
    email,
    "Welcome to Event Management System",
    html
  );
};

/**
 * Send registration confirmation email with registration ID
 * @param {string} email - User email
 * @param {string} name - User name
 * @param {string} eventTitle - Event title
 * @param {string} registrationId - Unique registration ID
 * @param {string} eventDate - Event date
 * @returns {Promise}
 */
export const sendRegistrationEmail = async (
  email,
  name,
  eventTitle,
  registrationId,
  eventDate
) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .registration-id { background-color: #fff; padding: 15px; border: 2px solid #2196F3; border-radius: 5px; text-align: center; margin: 20px 0; }
        .registration-id h2 { color: #2196F3; margin: 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Registration Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Your registration for <strong>${eventTitle}</strong> has been confirmed!</p>
          <div class="registration-id">
            <h2>Registration ID: ${registrationId}</h2>
          </div>
          <p><strong>Event Date:</strong> ${new Date(eventDate).toLocaleString()}</p>
          <p>Please save this Registration ID for your records. You'll need it for event check-in.</p>
          <p>We look forward to seeing you at the event!</p>
          <p>Best regards,<br>The Event Management Team</p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(
    email,
    `Registration Confirmed - ${eventTitle}`,
    html
  );
};

export default sendEmail;

