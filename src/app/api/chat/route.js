import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 

export const runtime = 'edge';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});
 
 
export async function POST(req) {
    console.log('API Key:', process.env.OPENAI_API_KEY);
    try{
        if(!process.env.OPENAI_API_KEY){
            return new NextResponse('Missing OpenAI API key.', {status: 400})
        }

        const { messages } = await req.json();

        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          stream: true,
          messages,
        });
       
        
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    }catch (error) {
        return new NextResponse(error.message || 'Something went wrong!' ,{
            status: 500
        })
    }
}