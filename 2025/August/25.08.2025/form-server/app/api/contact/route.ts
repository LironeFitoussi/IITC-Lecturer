import { NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

}

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "Contact API is running" });
}