import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateBriefPDF } from "@/lib/pdfGenerator";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      role,
      company,
      location,
      packageName,
      packageCode,
      packageId,
      industry,
      projectDescription,
      coreProblem,
      budgetRange,
      timeline,
      decisionMaker,
      priorExperience,
      referralSource,
      existingAssets,
      inspirationUrl,
      additionalNotes,
    } = body;

    const host = req.headers.get("host") || "elevationstudio.ng";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // Validate essential fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Missing essential project brief fields (name, email, company)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Resend email dispatcher is not configured. Please add RESEND_API_KEY." },
        { status: 500 }
      );
    }

    // Generate dynamic PDF commission brief summary
    const pdfBuffer = await generateBriefPDF(body).catch((err) => {
      console.error("PDF Generation failed:", err);
      return null;
    });

    const resend = new Resend(apiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f5f7;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .content {
            padding: 32px;
          }
          .section-title {
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #b38624;
            border-bottom: 1px solid #f3ebd8;
            padding-bottom: 8px;
            margin: 24px 0 16px;
            font-weight: bold;
          }
          .field {
            margin-bottom: 16px;
          }
          .field-label {
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .field-value {
            font-size: 14px;
            color: #0f172a;
            line-height: 1.5;
            font-weight: 500;
          }
          .highlight {
            background-color: #fdfbf7;
            border: 1px solid #f3ebd8;
            border-left: 3px solid #d4a843;
            padding: 14px 18px;
            border-radius: 4px;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #64748b;
          }
          .footer a {
            color: #b38624;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Luxury Architectural Brand Bar -->
          <div style="height: 4px; background-color: #d4a843;"></div>
          <div style="background-color: #0d111b; padding: 28px 24px; text-align: center; border-bottom: 2px solid #d4a843;">
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 4px; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">
              ELEVATION <span style="color: #d4a843;">STUDIO</span>
            </div>
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 9px; letter-spacing: 2.5px; color: #8a8a93; text-transform: uppercase;">
              BRAND &bull; DIGITAL &bull; SPACE &bull; CULTURE
            </div>
          </div>
          <div style="padding: 12px 24px; background-color: #f8fafc; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; letter-spacing: 2.5px; color: #64748b; text-transform: uppercase; line-height: 1; font-weight: 600;">Project Commission Brief</p>
          </div>
          
          <div class="content">
            <div class="field highlight">
              <div class="field-label">Selected Scope</div>
              <div class="field-value" style="font-weight: bold; font-size: 16px; color: #0f172a;">
                ${packageName} (${packageCode})
              </div>
            </div>

            <div class="section-title">Client Identity</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
              <tr>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Contact Name</div>
                  <div class="field-value">${name}</div>
                </td>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${email}" style="color: #b38624; text-decoration: none; font-weight: 600;">${email}</a></div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value">${phone || "—"}</div>
                </td>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Location / Origin</div>
                  <div class="field-value">${location || "—"}</div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Company / Brand</div>
                  <div class="field-value">${company}</div>
                </td>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Stakeholder Role</div>
                  <div class="field-value">${role || "—"}</div>
                </td>
              </tr>
            </table>

            <div class="section-title">Project Scope Details</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Target Industry</div>
                  <div class="field-value">${industry || "—"}</div>
                </td>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Budget Scale</div>
                  <div class="field-value" style="color: #b38624; font-weight: bold;">${budgetRange || "—"}</div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Desired Timeline</div>
                  <div class="field-value">${timeline || "—"}</div>
                </td>
                <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                  <div class="field-label">Decision Maker / Signoff</div>
                  <div class="field-value">${decisionMaker || "—"}</div>
                </td>
              </tr>
            </table>

            <div class="field" style="margin-top: 12px;">
              <div class="field-label">The Core Challenge / Objective</div>
              <div class="field-value" style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; color: #1e293b;">${coreProblem || "—"}</div>
            </div>

            <div class="field">
              <div class="field-label">Project Description & Detail</div>
              <div class="field-value" style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; color: #1e293b;">${projectDescription || "—"}</div>
            </div>

            <div class="section-title">Background & Assets</div>
            <div class="field">
              <div class="field-label">Prior Agency Experience</div>
              <div class="field-value">${priorExperience || "—"}</div>
            </div>
            <div class="field">
              <div class="field-label">Existing Assets / Base Materials</div>
              <div class="field-value">${existingAssets || "—"}</div>
            </div>
            <div class="field">
              <div class="field-label">Inspiration URL References</div>
              <div class="field-value">${inspirationUrl ? '<a href="' + inspirationUrl + '" target="_blank" style="color: #b38624; text-decoration: none; font-weight: 600;">' + inspirationUrl + '</a>' : "—"}</div>
            </div>
            <div class="field">
              <div class="field-label">Referral Source</div>
              <div class="field-value">${referralSource || "—"}</div>
            </div>
            <div class="field" style="margin-top: 16px;">
              <div class="field-label">Additional Comments</div>
              <div class="field-value" style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; color: #1e293b;">${additionalNotes || "—"}</div>
            </div>
          </div>
          
          <div class="footer">
            Sent securely via Resend from <a href="https://elevationstudio.ng">elevationstudio.ng</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f5f7;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .content {
            padding: 32px 40px;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #64748b;
          }
          .footer a {
            color: #b38624;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Luxury Architectural Brand Bar -->
          <div style="height: 4px; background-color: #d4a843;"></div>
          <div style="background-color: #0d111b; padding: 28px 24px; text-align: center; border-bottom: 2px solid #d4a843;">
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 4px; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">
              ELEVATION <span style="color: #d4a843;">STUDIO</span>
            </div>
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 9px; letter-spacing: 2.5px; color: #8a8a93; text-transform: uppercase;">
              BRAND &bull; DIGITAL &bull; SPACE &bull; CULTURE
            </div>
          </div>
          <div style="padding: 12px 24px; background-color: #f8fafc; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; letter-spacing: 2.5px; color: #64748b; text-transform: uppercase; line-height: 1; font-weight: 600;">Project Brief Confirmation</p>
          </div>
          
          <div class="content">
            <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; color: #0f172a; margin: 0 0 16px; font-weight: 600;">Dear ${name.split(" ")[0]},</h2>
            <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px;">
              Thank you for initiating a project with Elevation Studio. We have successfully registered your commission parameters and our partners are currently reviewing the scope.
            </p>
            <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 24px;">
              We have compiled your selection details into an official **Project Brief PDF** which is attached to this email for your personal download and records.
            </p>
            <div style="background-color: #fdfbf7; border: 1px solid #f3ebd8; border-left: 3px solid #d4a843; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <div style="font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; font-weight: 600;">Registered Scope</div>
              <div style="font-size: 15px; color: #0f172a; font-weight: bold;">${packageName}</div>
              <div style="font-size: 12px; color: #b38624; margin-top: 4px; font-weight: 600;">Selected Scale: ${budgetRange || "—"}</div>
            </div>
            <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #64748b; line-height: 1.6; margin: 0;">
              A partner will reach out to you directly to align on the next steps and schedule your design consultation.
            </p>
          </div>
          
          <div class="footer">
            Sent securely via Resend from <a href="https://elevationstudio.ng">elevationstudio.ng</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || "Elevation Studio <support@mindvestglobalresources.com.ng>";

    const safeCompanyName = (company || "Client").replace(/[^a-zA-Z0-9_-]/g, "_");

    // Only attach the PDF — images are embedded as data URIs in the HTML
    const pdfAttachment = pdfBuffer ? [
      {
        filename: `Elevation_Studio_Brief_${safeCompanyName}.pdf`,
        content: pdfBuffer.toString("base64"),
        contentType: "application/pdf",
      }
    ] : [];

    let studioRes = null;
    let clientRes = null;

    try {
      studioRes = await resend.emails.send({
        from: fromEmail,
        to: "support@mindvestglobalresources.com.ng",
        replyTo: email,
        subject: `New Project Inquiry — ${company} (${packageName})`,
        html: emailHtml,
        attachments: pdfAttachment,
      });
    } catch (err) {
      console.error("Failed sending email to studio:", err);
    }

    try {
      clientRes = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Project Commission Brief — Elevation Studio`,
        html: clientEmailHtml,
        attachments: pdfAttachment,
      });
    } catch (err) {
      console.error("Failed sending email to client:", err);
    }

    return NextResponse.json({ success: true, studioData: studioRes, clientData: clientRes });
  } catch (error) {
    console.error("Resend API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
