import Resume from "../../../models/Resume";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Ensure database is connected
    await mongoose.connect(process.env.MONGO_URI);

    // Fetch all resumes in database
    const resumes = await Resume.find({}).sort({createdAt: -1});
    return new Response(JSON.stringify(resumes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch(error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {
  try {
    // Ensure database is connected
    await mongoose.connect(process.env.MONGO_URI);

    // Parse the request body
    const body = await req.json();
    console.log(body);

    // Create resume
    const resume = await Resume.create(body);
    return new Response(JSON.stringify(resume), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch(error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}