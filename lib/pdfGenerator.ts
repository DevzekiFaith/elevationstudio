import PDFDocument from "pdfkit";

export interface BriefData {
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  location: string;
  packageName: string;
  packageCode: string;
  packageId: string;
  industry: string;
  projectDescription: string;
  coreProblem: string;
  budgetRange: string;
  timeline: string;
  decisionMaker: string;
  priorExperience: string;
  referralSource: string;
  existingAssets: string;
  inspirationUrl: string;
  additionalNotes: string;
}

export async function generateBriefPDF(data: BriefData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // Colors
      const gold = "#d4a843";
      const darkBg = "#0e0e12";
      const charcoal = "#1c1a17";
      const muted = "#6e6e76";
      const lightBg = "#f8f8fa";

      // ─── HEADER BAND (Off-Black background block) ───
      doc.rect(0, 0, 595.28, 120).fill(darkBg);

      // Gold dot (circle)
      doc.circle(60, 60, 5).fill(gold);

      // ELEVATION STUDIO text
      doc.fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(22)
        .text("ELEVATION", 75, 48, { lineBreak: false })
        .fillColor(gold)
        .text(" STUDIO", { lineBreak: false });

      // Subtitle
      doc.fillColor(muted)
        .font("Helvetica")
        .fontSize(10)
        .text("OFFICIAL COMMISSION BRIEF SUMMARY", 75, 78);

      // ─── DOCUMENT TITLE ───
      doc.y = 150;
      doc.fillColor(charcoal)
        .font("Helvetica-Bold")
        .fontSize(18)
        .text("PROJECT COMMISSION BRIEF", 50, doc.y);

      doc.font("Helvetica")
        .fontSize(10)
        .fillColor(muted)
        .text(`Generated on: ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}`, 50, doc.y + 15);

      // Horizontal line
      doc.moveTo(50, doc.y + 32)
        .lineTo(545.28, doc.y + 32)
        .strokeColor("#e4e4e7")
        .lineWidth(1)
        .stroke();

      doc.y = doc.y + 45;

      // ─── HIGHLIGHT BOX: Selected Scope ───
      const highlightBoxY = doc.y;
      doc.rect(50, highlightBoxY, 495.28, 64).fill(lightBg);
      doc.rect(50, highlightBoxY, 4, 64).fill(gold);

      doc.fillColor(muted)
        .font("Helvetica-Bold")
        .fontSize(8)
        .text("SELECTED SCOPE", 70, highlightBoxY + 10);

      doc.fillColor(charcoal)
        .font("Helvetica-Bold")
        .fontSize(13)
        .text(`${data.packageName}`, 70, highlightBoxY + 22);

      const getPackagePriceRange = (pkgId: string): string => {
        switch (pkgId) {
          case "1": return "₦500K — ₦2M";
          case "2": return "₦1.5M — ₦5M";
          case "3": return "₦5M — ₦20M";
          case "4": return "₦15M — ₦50M+";
          case "res-arch": return "Starting from ₦1.5M";
          case "res-master": return "Starting from ₦4.5M";
          default: return "Custom Quote";
        }
      };

      const baseRange = getPackagePriceRange(data.packageId || "");

      doc.fillColor(muted)
        .font("Helvetica")
        .fontSize(9.5)
        .text(`Baseline Scope: ${baseRange}    |    Client Selected Budget: `, 70, highlightBoxY + 40, { lineBreak: false })
        .fillColor(gold)
        .font("Helvetica-Bold")
        .text(data.budgetRange || "—");

      doc.y = highlightBoxY + 84;

      // Helper function to draw section titles
      const drawSectionTitle = (title: string) => {
        // Page break safety check
        if (doc.y > 680) {
          doc.addPage();
          // Draw mini page-header on new pages
          doc.rect(0, 0, 595.28, 40).fill(darkBg);
          doc.circle(30, 20, 3).fill(gold);
          doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(12).text("ELEVATION STUDIO", 45, 14);
          doc.y = 70;
        }

        doc.fillColor(gold)
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(title.toUpperCase(), 50, doc.y);
        
        doc.moveTo(50, doc.y + 14)
          .lineTo(545.28, doc.y + 14)
          .strokeColor("#f4f4f5")
          .lineWidth(1)
          .stroke();
        
        doc.y = doc.y + 24;
      };

      // Helper function to draw fields in grid layout
      const drawGridField = (label: string, value: string, x: number, y: number) => {
        doc.fillColor(muted)
          .font("Helvetica-Bold")
          .fontSize(8)
          .text(label.toUpperCase(), x, y);
        
        doc.fillColor(charcoal)
          .font("Helvetica")
          .fontSize(10)
          .text(value || "—", x, y + 12, { width: 230, ellipsis: true });
      };

      // ─── SECTION 1: CLIENT PROFILE ───
      drawSectionTitle("Client Profile");

      const col1X = 50;
      const col2X = 300;
      const rowHeight = 36;

      let currentGridY = doc.y;
      drawGridField("Contact Name", data.name, col1X, currentGridY);
      drawGridField("Email Address", data.email, col2X, currentGridY);

      currentGridY += rowHeight;
      drawGridField("Phone Number", data.phone, col1X, currentGridY);
      drawGridField("Location / Origin", data.location, col2X, currentGridY);

      currentGridY += rowHeight;
      drawGridField("Company / Brand", data.company, col1X, currentGridY);
      drawGridField("Stakeholder Role", data.role, col2X, currentGridY);

      doc.y = currentGridY + rowHeight + 15;

      // ─── SECTION 2: COMMISSION DETAILS ───
      drawSectionTitle("Commission Details");

      currentGridY = doc.y;
      drawGridField("Target Industry", data.industry, col1X, currentGridY);
      drawGridField("Budget Scale", data.budgetRange, col2X, currentGridY);

      currentGridY += rowHeight;
      drawGridField("Desired Timeline", data.timeline, col1X, currentGridY);
      drawGridField("Decision Maker / Signoff", data.decisionMaker, col2X, currentGridY);

      doc.y = currentGridY + rowHeight + 15;

      // Helper for multi-line details that might span pages
      const drawNarrativeField = (label: string, text: string) => {
        // Page break safety check
        if (doc.y > 650) {
          doc.addPage();
          // Draw mini page-header on new pages
          doc.rect(0, 0, 595.28, 40).fill(darkBg);
          doc.circle(30, 20, 3).fill(gold);
          doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(12).text("ELEVATION STUDIO", 45, 14);
          doc.y = 70;
        }

        doc.fillColor(muted)
          .font("Helvetica-Bold")
          .fontSize(8)
          .text(label.toUpperCase(), 50, doc.y);

        const textVal = text || "—";
        doc.fillColor(charcoal)
          .font("Helvetica")
          .fontSize(9.5)
          .text(textVal, 50, doc.y + 12, { width: 495.28, align: "justify", lineGap: 3 });

        doc.y = doc.y + doc.heightOfString(textVal, { width: 495.28, lineGap: 3 }) + 24;
      };

      // ─── SECTION 3: CORE NARRATIVE ───
      drawSectionTitle("Core Objectives & Scope");
      drawNarrativeField("The Core Challenge / Objective", data.coreProblem);
      drawNarrativeField("Detailed Project Description", data.projectDescription);

      // ─── SECTION 4: BACKGROUND & ASSETS ───
      drawSectionTitle("Background & Assets");

      currentGridY = doc.y;
      drawGridField("Prior Agency Experience", data.priorExperience, col1X, currentGridY);
      drawGridField("Referral Source", data.referralSource, col2X, currentGridY);

      currentGridY += rowHeight;
      drawGridField("Existing Assets", data.existingAssets, col1X, currentGridY);
      drawGridField("Inspiration URL References", data.inspirationUrl, col2X, currentGridY);

      doc.y = currentGridY + rowHeight + 20;

      if (data.additionalNotes) {
        drawNarrativeField("Additional Comments", data.additionalNotes);
      }

      // ─── FOOTER (mini metadata on last page) ───
      doc.fillColor(muted)
        .font("Helvetica")
        .fontSize(8)
        .text("Elevation Studio © 2026. All rights reserved.", 50, 770, { align: "center", width: 495.28 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
