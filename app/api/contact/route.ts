import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key exists
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const productLabels: Record<string, string> = {
  life: "Life Insurance",
  health: "Health Insurance",
  vehicle: "Vehicle Insurance",
  home: "Home Insurance",
  fire: "Fire Insurance",
  marine: "Marine Insurance",
  engineering: "Engineering Insurance",
  liability: "Liability Insurance",
  industrial: "Industrial Insurance",
  financial: "Financial Services",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, product, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !product) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If no Resend API key, log and return success (for demo/testing)
    if (!resend) {
      console.log("Form submission (email not configured):", { name, email, phone, product, message });
      return NextResponse.json(
        { success: true, message: "Form received (email service not configured)" },
        { status: 200 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "H.V. Ranade Website <onboarding@resend.dev>",
      to: "hvranade@yahoo.com",
      subject: `New Insurance Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #1a365d; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #d69e2e; margin: 0; font-size: 24px;">H.V. Ranade & Associates</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">New Insurance Enquiry</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1a365d; margin-bottom: 20px; font-size: 18px; border-bottom: 2px solid #d69e2e; padding-bottom: 10px;">
              Customer Details
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 30%;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; color: #333;">${name}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; color: #333;">${phone}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px 0; color: #666;"><strong>Product:</strong></td>
                <td style="padding: 10px 0; color: #333;">${productLabels[product] || product}</td>
              </tr>
            </table>
            
            ${message ? `
            <h2 style="color: #1a365d; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid #d69e2e; padding-bottom: 10px;">
              Message
            </h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            ` : ""}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>This enquiry was submitted from the H.V. Ranade website on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
