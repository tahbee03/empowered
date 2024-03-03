'use client'

import React from 'react'
import { useChat } from 'ai/react'
import { useEffect, useRef,useState } from 'react'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../components/ui/scroll-area'
import CopyToClipboard from '../../components/copy-to-clipboard'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

import { SendHorizontalIcon } from 'lucide-react'

export default function Page() {
  const [finalResumeText, setFinalResumeText] = useState(''); // State to store the final resume text
  console.log(finalResumeText)
  const ref = useRef(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
  useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I Want you to ask resume questions in this order in this form of an example object exactly with their information filled in
        let resume = {
          name: "",
          phone: "",
          email: "",
          education: {
              school: "",
              gpa: "",
              degree: "",
              start_date: "",
              end_date: ""
          },
          work_experience: {
              job_title: "",
              company: "",
              responsibilities: "",
              start_date: "",
              end_date: ""
          },
          skills: [""]
      };
        
        once your done collecting information  return the object. if the user needs help with anything help them. if they forgot to answer anything make sure
        to go back and get everything. What is your first and last name?
       
        
        `
      },
     
     
    ]
  });
  
  const isFinalResponse = (response) => {
    // Define keywords or phrases that likely indicate the final response
    const indicators = ["Here is", "completed", ];
    return indicators.some(indicator => response.includes(indicator));
  };

  useEffect(() => {
    if (ref.current === null){ 
      ref.current.scrollTo(0, ref.current.scrollHeight);}
    // ref.current.scrollTop = ref.current.scrollHeight
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.role === 'assistant' && isFinalResponse(latestMessage.content)) {
      // Extract the resume text for parsing
      setFinalResumeText(latestMessage.content);
      // Here, you would call a function to safely parse `finalResumeText` into an object
      // and then update `resumeData` state with it.
      // This step is not shown here due to the complexity and security implications of parsing.
      
    }
  }, [messages])

  return (
    <section className='text-zinc-700'>
      <div className='container flex h-screen flex-col items-center justify-center'>
        <h1 className='font-serif text-2xl font-medium'>AI Chatbot</h1>
        <div className='mt-4 w-full max-w-lg'>
          <ScrollArea
            className='mb-2 h-[400px] rounded-md border p-4'
            ref={ref}
          >
            {error && (
              <div className='text-sm text-red-400'>{error.message}</div>
            )}
            {messages.map(m => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
            {
              // Check if the message contains the detailed instructions and extract the question part
              m.content.includes("What is your first and last name?") ?
              "What is your first and last name?" : m.content
            }
            </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
                                                                                  
          <form onSubmit={handleSubmit} className='relative'>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder='Answer the questions ...'
              className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isLoading}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}


 

 
