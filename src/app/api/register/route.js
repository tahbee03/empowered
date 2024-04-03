import User from "../../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  // Ensure database is connected
  await mongoose.connect(process.env.MONGO_URI);

  // Parse the request body
  const body = await req.json();
  
  // Check if a user with the given email already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User with this email already exists." }), {
      status: 409, // 409 Conflict
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);

  // Create the user
  try {
    const createdUser = await User.create(body);
    return new Response(JSON.stringify(createdUser), {
      status: 201, // 201 Created
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
