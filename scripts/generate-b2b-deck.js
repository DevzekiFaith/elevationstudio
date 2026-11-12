const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateB2BDeck() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    info: {
      Title: 'Elevation Studio — B2B Architectural Capabilities Deck',
      Author: 'Elevation Studio',
      Subject: 'B2B Architecture, Detailing & 3D Visualization Capabilities',
      Keywords: 'Architecture, 3D Visualization, Nigeria, BIM, Developers',
    },
  });

  const outputPath = path.join(__dirname, '../public/docs/elevation-studio-b2b-capabilities.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const gold = '#C59B3F';
  const dark = '#10121A';
  const charcoal = '#242731';
  const lightBg = '#F6F7F9';
  const textMuted = '#585D6B';
  const textBody = '#1E222B';

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const contentWidth = pageWidth - 72; // 523.28

  // Top Accent Bar
  doc.rect(0, 0, pageWidth, 6).fill(gold);

  // Header Section
  let y = 26;
  doc.rect(36, y, contentWidth, 54).fill(dark);

  doc
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .fontSize(18)
    .text('ELEVATION', 48, y + 12, { continued: true });
  doc.fillColor(gold).text(' STUDIO');

  doc
    .fillColor('#A2A7B5')
    .font('Helvetica')
    .fontSize(8.5)
    .text('ARCHITECTURAL ATELIER & SPATIAL ENGINEERING', 48, y + 33);

  // Header Right Metadata
  doc
    .fillColor(gold)
    .font('Helvetica-Bold')
    .fontSize(8.5)
    .text('B2B CAPABILITIES SPECIFICATION', 340, y + 14, { width: 200, align: 'right' });
  doc
    .fillColor('#CCCCCC')
    .font('Helvetica')
    .fontSize(7.5)
    .text('Confidential · For Developers & Architecture Studios', 340, y + 28, { width: 200, align: 'right' });
  doc
    .fillColor('#8E93A0')
    .text('Lagos — Ogun Corridor · Nationwide Delivery', 340, y + 39, { width: 200, align: 'right' });

  // Executive Summary Box
  y = 90;
  doc.rect(36, y, contentWidth, 48).fill(lightBg);
  doc.rect(36, y, 3, 48).fill(gold);

  doc
    .fillColor(dark)
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('EXECUTIVE OVERVIEW', 48, y + 9);
  doc
    .fillColor(textBody)
    .font('Helvetica')
    .fontSize(8)
    .lineGap(2)
    .text(
      'Elevation Studio extends project execution bandwidth for architectural firms and real estate developers. We provide licensed architectural design, structural/MEP detailing, and cinema-grade 4K 3D renders with guaranteed 100% white-label confidentiality and rapid turnaround.',
      48,
      y + 22,
      { width: contentWidth - 24 }
    );

  // Core Capabilities (4 Columns / Cards)
  y = 148;
  doc
    .fillColor(dark)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('CORE B2B CAPABILITY STACK', 36, y);

  doc
    .strokeColor('#E2E5EB')
    .lineWidth(0.75)
    .moveTo(36, y + 14)
    .lineTo(pageWidth - 36, y + 14)
    .stroke();

  const services = [
    {
      num: '01',
      title: 'Architectural & BIM Detailing',
      desc: 'Complete working drawing sets, Revit/CAD documentation, room schedules, building code adherence, and local authority approval coordination.',
    },
    {
      num: '02',
      title: 'Photorealistic 4K Visuals',
      desc: 'Cinema-grade exterior and interior 3D stills, dusk/daylight lighting studies, accurate material physics, and masterplan bird’s-eye views.',
    },
    {
      num: '03',
      title: 'Cinematic Video Walkthroughs',
      desc: '60fps 4K drone-view simulations and interior tours with spatial realism designed specifically for investor pitch decks and off-plan pre-sales.',
    },
    {
      num: '04',
      title: 'Developer Masterplans & Retainers',
      desc: 'Phased multi-unit estate layouts, perimeter zoning, structural optimization, and dedicated monthly production bandwidth for continuous development.',
    },
  ];

  const colWidth = (contentWidth - 18) / 2;
  const cardHeight = 64;

  services.forEach((s, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 36 + col * (colWidth + 18);
    const cardY = y + 22 + row * (cardHeight + 10);

    doc.rect(cardX, cardY, colWidth, cardHeight).fill(lightBg);
    doc.rect(cardX, cardY, colWidth, cardHeight).strokeColor('#E5E8EE').lineWidth(0.5).stroke();

    doc
      .fillColor(gold)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(s.num, cardX + 10, cardY + 8, { continued: true });
    doc
      .fillColor(dark)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(`  ${s.title}`);

    doc
      .fillColor(textMuted)
      .font('Helvetica')
      .fontSize(7.5)
      .lineGap(1.5)
      .text(s.desc, cardX + 10, cardY + 22, { width: colWidth - 20 });
  });

  // Flagship Visual Proof Strip
  y = 312;
  doc
    .fillColor(dark)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('PROVEN REFERENCE: MULTI-UNIT RESIDENTIAL ESTATE', 36, y);

  doc
    .strokeColor('#E2E5EB')
    .lineWidth(0.75)
    .moveTo(36, y + 14)
    .lineTo(pageWidth - 36, y + 14)
    .stroke();

  const imgPath = path.join(__dirname, '../public/renders/luxury_terrace_duplex_estate.jpg');
  const imgY = y + 22;
  const imgWidth = 220;
  const imgHeight = 118;

  if (fs.existsSync(imgPath)) {
    doc.image(imgPath, 36, imgY, { width: imgWidth, height: imgHeight });
    doc.rect(36, imgY, imgWidth, imgHeight).strokeColor('#D1D5DB').lineWidth(0.5).stroke();
  }

  // Right side of image: Project Metrics & Case Detail
  const detailX = 36 + imgWidth + 16;
  const detailWidth = contentWidth - imgWidth - 16;

  doc.rect(detailX, imgY, detailWidth, imgHeight).fill('#FAFBFC');
  doc.rect(detailX, imgY, detailWidth, imgHeight).strokeColor('#E5E8EE').lineWidth(0.5).stroke();

  doc
    .fillColor(dark)
    .font('Helvetica-Bold')
    .fontSize(9.5)
    .text('Flagship Case: Phased Terrace Estate', detailX + 12, imgY + 10);

  doc
    .fillColor(textBody)
    .font('Helvetica')
    .fontSize(7.5)
    .lineGap(2)
    .text(
      'Developed for institutional real estate partners to drive off-plan investor allocations. Scope incorporated complete exterior zoning, daylight balance, landscape architecture, and high-fidelity exterior renders.',
      detailX + 12,
      imgY + 26,
      { width: detailWidth - 24 }
    );

  const metrics = [
    { label: 'Turnaround Draft', val: '72 Hours' },
    { label: 'Native Output', val: 'Revit + DWG + 4K TIFF' },
    { label: 'Confidentiality', val: '100% White-Label / NDA' },
  ];

  let metY = imgY + 68;
  metrics.forEach((m) => {
    doc
      .fillColor(gold)
      .font('Helvetica-Bold')
      .fontSize(7.5)
      .text('●', detailX + 12, metY);
    doc
      .fillColor(dark)
      .font('Helvetica-Bold')
      .fontSize(7.5)
      .text(` ${m.label}: `, detailX + 20, metY, { continued: true });
    doc
      .fillColor(textMuted)
      .font('Helvetica')
      .text(m.val);
    metY += 14;
  });

  // Collaboration Pathways & SLAs
  y = 464;
  doc
    .fillColor(dark)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('COLLABORATION MODELS & SERVICE LEVEL AGREEMENTS', 36, y);

  doc
    .strokeColor('#E2E5EB')
    .lineWidth(0.75)
    .moveTo(36, y + 14)
    .lineTo(pageWidth - 36, y + 14)
    .stroke();

  const models = [
    {
      title: 'Model A: Studio Capacity Overflow',
      target: 'FOR ARCHITECTURE FIRMS & CONSULTANCIES',
      bullets: [
        'Short-notice drafting & visualization during peak project deadlines',
        '48–72h initial render draft delivery via secure shared vault',
        'Direct Revit (RVT) / AutoCAD (DWG) native file handover',
        '100% White-Label protection — your firm retains all client visibility',
      ],
    },
    {
      title: 'Model B: Developer Phased Retainer',
      target: 'FOR REAL ESTATE DEVELOPERS & ESTATE SPONSORS',
      bullets: [
        'Dedicated monthly allocation of architectural & 3D render production',
        'Priority queue for marketing campaign asset changes & adjustments',
        'Masterplan, floor plan 3D cutaways, and cinematic presale video reels',
        'Transparent structured billing with discounted bulk volume rates',
      ],
    },
  ];

  models.forEach((m, idx) => {
    const mX = 36 + idx * (colWidth + 18);
    const mY = y + 22;
    const mHeight = 110;

    doc.rect(mX, mY, colWidth, mHeight).fill(lightBg);
    doc.rect(mX, mY, colWidth, mHeight).strokeColor('#E5E8EE').lineWidth(0.5).stroke();

    doc
      .fillColor(dark)
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .text(m.title, mX + 10, mY + 10);

    doc
      .fillColor(gold)
      .font('Helvetica-Bold')
      .fontSize(6.5)
      .text(m.target, mX + 10, mY + 23);

    let bY = mY + 36;
    m.bullets.forEach((b) => {
      doc
        .fillColor(gold)
        .font('Helvetica')
        .fontSize(7)
        .text('✓', mX + 10, bY);
      doc
        .fillColor(textBody)
        .font('Helvetica')
        .fontSize(7)
        .text(b, mX + 20, bY, { width: colWidth - 28 });
      bY += 16;
    });
  });

  // Guarantee Banner
  y = 604;
  doc.rect(36, y, contentWidth, 36).fill('#131622');
  doc.rect(36, y, 3, 36).fill(gold);

  doc
    .fillColor('#FFFFFF')
    .font('Helvetica-Bold')
    .fontSize(8.5)
    .text('THE ELEVATION STUDIO B2B GUARANTEE', 48, y + 8);
  doc
    .fillColor('#CCCCCC')
    .font('Helvetica')
    .fontSize(7)
    .text(
      'Every B2B engagement is covered by a standard mutual Non-Disclosure Agreement (NDA). Elevation Studio does not publish, showcase, or claim public credit for outsourced work without prior written authorization from the primary partner firm.',
      48,
      y + 20,
      { width: contentWidth - 24 }
    );

  // Footer / Next Steps / Direct Action Bar
  y = 650;
  doc.rect(36, y, contentWidth, 68).fill(dark);

  doc
    .fillColor(gold)
    .font('Helvetica-Bold')
    .fontSize(8.5)
    .text('INITIATE COLLABORATION OR DISCUSS AN ACTIVE SCHEME', 48, y + 12);

  doc
    .fillColor('#FFFFFF')
    .font('Helvetica')
    .fontSize(7.5)
    .text('Direct Partner WhatsApp: ', 48, y + 28, { continued: true });
  doc
    .fillColor(gold)
    .font('Helvetica-Bold')
    .text('+234 911 905 9859', { continued: true });
  doc
    .fillColor('#AAAAAA')
    .font('Helvetica')
    .text('  (Fastest channel for scheme dispatch & quote)');

  doc
    .fillColor('#FFFFFF')
    .font('Helvetica')
    .fontSize(7.5)
    .text('Email Submissions: ', 48, y + 42, { continued: true });
  doc
    .fillColor('#CCCCCC')
    .font('Helvetica')
    .text('elevationstudios01@gmail.com   ·   Web: www.elevationstudiong.com.ng');

  // Bottom legal footnote
  doc
    .fillColor('#666A78')
    .font('Helvetica')
    .fontSize(6.5)
    .text(
      '© 2026 Elevation Studio. A subsidiary of Mindvest Global Resources LLC. Lagos — Ogun Corridor, Nigeria. Serving clients nationally & globally.',
      36,
      pageHeight - 22,
      { align: 'center', width: contentWidth }
    );

  doc.end();
}

generateB2BDeck();
console.log('B2B Deck PDF generated successfully.');
