import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "resources"));

    const resources = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      resources,
    });
  } catch (error) {
    console.error("Firestore error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve resources.",
      },
      {
        status: 500,
      }
    );
  }
}