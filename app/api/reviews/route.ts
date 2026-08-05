import { NextRequest, NextResponse } from "next/server";

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  packageUsed: string;
  quote: string;
  createdAt: string;
  verified: boolean;
}

// In-memory reviews store for API requests
const inMemoryReviews: ReviewItem[] = [
  {
    id: "rev-01",
    author: "Engr. Rotimi Adebayo",
    role: "Managing Director",
    company: "Crestview Eco-Properties & Masterplans",
    location: "Lagos / Ogun Corridor, Nigeria",
    rating: 5,
    packageUsed: "Package 03 — The Elevation (Brand + Digital + Space)",
    quote:
      "When launching our masterplan along the Ogun–Lagos corridor, we needed spatial architecture renders that matched real civil blueprints and an interactive plot selector. Elevation Studio delivered both flawlessly without us needing three different agencies.",
    createdAt: "2026-08-01T10:00:00Z",
    verified: true,
  },
  {
    id: "rev-02",
    author: "Toluwanimi Alabi",
    role: "Operations Director",
    company: "Volta Luxury Boutique Hotel Group",
    location: "Victoria Island, Lagos, Nigeria",
    rating: 5,
    packageUsed: "Package 04 — The Master Plan (Brand + Digital + Space + Culture)",
    quote:
      "Most agencies give you a PDF brand guide and disappear. Elevation Studio designed our luxury identity system, engineered our custom Next.js booking engine, and conducted 6 months of Mindvest culture training for our hospitality staff.",
    createdAt: "2026-08-02T14:30:00Z",
    verified: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    reviews: inMemoryReviews,
    total: inMemoryReviews.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, role, company, location, rating, packageUsed, quote } = body;

    if (!author || !quote || !rating) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (author, rating, quote)" },
        { status: 400 }
      );
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: String(author).trim(),
      role: role ? String(role).trim() : "Client Partner",
      company: company ? String(company).trim() : "Private Client",
      location: location ? String(location).trim() : "Lagos, Nigeria",
      rating: Number(rating) || 5,
      packageUsed: packageUsed || "Custom Studio Service",
      quote: String(quote).trim(),
      createdAt: new Date().toISOString(),
      verified: true,
    };

    inMemoryReviews.unshift(newReview);

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully!",
        review: newReview,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid review request payload" },
      { status: 500 }
    );
  }
}
