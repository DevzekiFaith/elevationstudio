import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    const resend = new Resend(apiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #060608;
            color: #f4f0e8;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0e0e12;
            border: 1px solid #1f1f27;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .header {
            background-color: #08080a;
            padding: 32px;
            border-bottom: 1px solid #1f1f27;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            letter-spacing: 4px;
            color: #d4a843;
            text-transform: uppercase;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 11px;
            letter-spacing: 2px;
            color: #8a8a93;
            text-transform: uppercase;
          }
          .content {
            padding: 32px;
          }
          .section-title {
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #d4a843;
            border-bottom: 1px solid rgba(212, 168, 67, 0.2);
            padding-bottom: 8px;
            margin: 24px 0 16px;
          }
          .field {
            margin-bottom: 16px;
          }
          .field-label {
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #8a8a93;
            margin-bottom: 4px;
          }
          .field-value {
            font-size: 14px;
            color: #f4f0e8;
            line-height: 1.5;
          }
          .highlight {
            background: rgba(212, 168, 67, 0.05);
            border-left: 2px solid #d4a843;
            padding: 12px 16px;
            border-radius: 0 4px 4px 0;
          }
          .footer {
            background-color: #08080a;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #1f1f27;
            font-size: 11px;
            color: #8a8a93;
          }
          .footer a {
            color: #d4a843;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 12px; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: middle; padding-right: 10px; line-height: 1;">
                  <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #d4a843;"></div>
                </td>
                <td style="vertical-align: middle; line-height: 1;">
                  <span style="font-family: 'Bebas Neue', Impact, 'Arial Black', sans-serif; font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">
                    ELEVATION <span style="color: #d4a843;">STUDIO</span>
                  </span>
                </td>
              </tr>
            </table>
            <p>Project Commission Brief</p>
          </div>
          
          <div class="content">
            <div class="field highlight">
              <div class="field-label">Selected Scope</div>
              <div class="field-value" style="font-weight: bold; font-size: 16px; color: #ffffff;">
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
                  <div class="field-value"><a href="mailto:${email}" style="color: #d4a843; text-decoration: none;">${email}</a></div>
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
                  <div class="field-value" style="color: #ffffff; font-weight: bold;">${budgetRange || "—"}</div>
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
              <div class="field-value" style="white-space: pre-wrap; background-color: #08080a; padding: 12px; border-radius: 4px; border: 1px solid #1f1f27;">${coreProblem || "—"}</div>
            </div>

            <div class="field">
              <div class="field-label">Project Description & Detail</div>
              <div class="field-value" style="white-space: pre-wrap; background-color: #08080a; padding: 12px; border-radius: 4px; border: 1px solid #1f1f27;">${projectDescription || "—"}</div>
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
              <div class="field-value">${inspirationUrl ? '<a href="' + inspirationUrl + '" target="_blank" style="color: #d4a843; text-decoration: none;">' + inspirationUrl + '</a>' : "—"}</div>
            </div>
            <div class="field">
              <div class="field-label">Referral Source</div>
              <div class="field-value">${referralSource || "—"}</div>
            </div>
            <div class="field" style="margin-top: 16px;">
              <div class="field-label">Additional Comments</div>
              <div class="field-value" style="white-space: pre-wrap; background-color: #08080a; padding: 12px; border-radius: 4px; border: 1px solid #1f1f27;">${additionalNotes || "—"}</div>
            </div>
          </div>
          
          <div class="footer">
            Sent securely via Resend from <a href="https://elevationstudio.ng">elevationstudio.ng</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || "Elevation Studio Inquiries <support@mindvestglobalresources.com.ng>";

    const data = await resend.emails.send({
      from: fromEmail,
      to: "support@mindvestglobalresources.com.ng",
      replyTo: email,
      subject: `New Project Inquiry — ${company} (${packageName})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend API Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
