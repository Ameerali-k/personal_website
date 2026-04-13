"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  name: string;
  email: string;
  mobile: string;
  service: string;
  message: string;
}) {
  const { name, email, mobile, service, message } = formData;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ameeralikprm@gmail.com'],
      subject: `New Project Inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #533fe7;">New Portfolio Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Requested:</strong> ${service.toUpperCase()}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #00ff00;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Email Action Error:", err);
    return { success: false, error: err.message };
  }
}
