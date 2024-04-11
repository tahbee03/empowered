'use client'

import React from 'react'
import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../components/ui/scroll-area'
import CopyToClipboard from '../../components/copy-to-clipboard'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { SendHorizontalIcon } from 'lucide-react'
import FinalResumePage from '../finalresume/page'
import { useRouter } from 'next/navigation'
export default function Page() {
  const [fontSize, setFontSize] = useState(16);
  const [fontMax, setFontMax] = useState(false); // Triggers font maximum size (6)
  const [fontMin, setFontMin] = useState(false); // Triggers font minimum size (24)

  // Function to increase font size
  const increaseFontSize = () => setFontSize(fontSize + 2);

  // Function to decrease font size
  const decreaseFontSize = () => setFontSize(fontSize - 2);
  const [finalResumeText, setFinalResumeText] = useState(''); // State to store the final resume text
  const router = useRouter()
  const [resumeData, setResumeData] = useState(null); // State to store the parsed resume data
  const [ttsEnabled, setTtsEnabled] = useState(false); // State to track TTS toggle
  const [isListening, setIsListening] = useState(false); // State to track if we're listening for speech
  const [speechRecognition, setSpeechRecognition] = useState(null); // Will hold our speech recognition instance
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
        to go back and get everything and if they dont have an answer leave it blank "". What is your first and last name?
       
        
        `
        },


      ]
    });


  const isFinalResponse = (response) => {
    // Define keywords or phrases that likely indicate the final response
    const indicators = ["Here is", "completed",];
    return indicators.some(indicator => response.includes(indicator));
  };
  useEffect(() => {

    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.role === 'assistant' && isFinalResponse(latestMessage.content)) {
      // Extract the resume text for parsing
      setFinalResumeText(latestMessage.content);
      // Here, you would call a function to safely parse `finalResumeText` into an object
      // and then update `resumeData` state with it.
      // This step is not shown here due to the complexity and security implications of parsing.

    }
    if (latestMessage && latestMessage.role === 'user' && ttsEnabled) {
      speakText(latestMessage.content); // Speak out the user's message if TTS is enabled
    }
  }, [messages, ttsEnabled]);

  // Text-to-Speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  // Toggle for enabling/disabling TTS
  const toggleTTS = () => {
    setTtsEnabled(!ttsEnabled);
  };
  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Automatically stop after a single result
      recognition.interimResults = false; // We're only interested in the final result
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleInputChange({ target: { value: transcript } }); // Update input with the transcript
        handleSubmit({ preventDefault: () => { } }); // Send message
        setIsListening(false); // Stop listening after receiving result
      };
      recognition.onend = () => {
        setIsListening(false); // Automatically stop listening when speech ends
      };
      setSpeechRecognition(recognition);
    }
  }, []);

  // Function to start listening
  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  // Assuming `finalResumeText` is a string that contains the above text
  useEffect(() => {
    if (finalResumeText) {
      try {
        // Initialize an empty object to hold the resume data
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
          work_experience: [],
          skills: []
        };

        let currentWorkExperience = null; // Temporary variable to keep track of the current work experience

        const lines = finalResumeText.split('\n');
        lines.forEach(line => {
          if (line.includes('name:')) {
            resume.name = line.split('"')[1];
          } else if (line.includes('phone:')) {
            resume.phone = line.split('"')[1];
          } else if (line.includes('email:')) {
            resume.email = line.split('"')[1];
          } else if (line.includes('school:')) {
            resume.education.school = line.split('"')[1];
          } else if (line.includes('gpa:')) {
            resume.education.gpa = line.split('"')[1];
          } else if (line.includes('degree:')) {
            resume.education.degree = line.split('"')[1];
          } else if (line.includes('start_date:') && !line.includes('work_experience')) {
            resume.education.start_date = line.split('"')[1];
          } else if (line.includes('end_date:') && !line.includes('work_experience')) {
            resume.education.end_date = line.split('"')[1];
          } if (line.includes('job_title:')) {
            // Create a new work experience object
            currentWorkExperience = {
              job_title: line.split('"')[1],
              company: "",
              responsibilities: "",
              start_date: "",
              end_date: ""
            };
          } else if (currentWorkExperience && line.includes('company:')) {
            currentWorkExperience.company = line.split('"')[1];
          } else if (currentWorkExperience && line.includes('responsibilities:')) {
            currentWorkExperience.responsibilities = line.split('"')[1];
          } else if (currentWorkExperience && line.includes('start_date:')) {
            currentWorkExperience.start_date = line.split('"')[1];
          } else if (currentWorkExperience && line.includes('end_date:')) {
            currentWorkExperience.end_date = line.split('"')[1];
            // After setting the end date, push the work experience object to the array
            resume.work_experience.push(currentWorkExperience);
            currentWorkExperience = null; // Reset for the next work experience block
          }
          else if (line.includes('skills:')) {
            resume.skills = line.split('[')[1].split(']')[0].split(',').map(skill => skill.trim().replace(/['"]+/g, ''));
          }
        });
        setResumeData(resume);
        localStorage.setItem('resumeData', JSON.stringify(resumeData));

        setTimeout(() => {
          // After a 3000ms delay, navigate to the /finalresume page
          <loading />
          router.push('/finalresume');
        }, 3000); // 3000 milliseconds delay for "Generating resume..."
        console.log(resume)
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }
  }, [finalResumeText]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    scrollArea.scrollTop = scrollArea.scrollHeight;
  }, [messages]);

  // Set states when font max and min are reached to disable buttons
  useEffect(() => {
    setFontMax(fontSize >= 24);
    setFontMin(fontSize <= 6);
  }, [fontSize]);

  return (
    <section className='text-zinc-700'>
      <div className='container flex h-screen flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>AI Chatbot</h1>
        <div className=''>
          <button
            className='m-2 text-[#501616] dark:text-[#CCA677] disabled:text-slate-500 dark:disabled:text-slate-500'
            onClick={increaseFontSize}
            disabled={fontMax}
          >
            Increase Font Size
          </button>
          <button
            className='m-2 text-[#501616] dark:text-[#CCA677] disabled:text-slate-500 dark:disabled:text-slate-500'
            onClick={decreaseFontSize}
            disabled={fontMin}
          >
            Decrease Font Size
          </button>
        </div>
        <Button onClick={startListening} disabled={isListening}>
          {isListening ? 'Listening...' : 'Speak'}
        </Button>
        <div className='mt-4 w-full max-w-lg'>
          <ScrollArea
            className='mb-2 h-[400px] rounded-md border p-4'
            ref={ref}
          >
            {error && (
              <div className='text-sm text-red-400'>{error.message}</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-black dark:text-white'>
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold text-black dark:text-white' style={{ fontSize: `${fontSize}px` }}>You</p>
                      <div className='mt-1.5 text-sm text-black dark:text-white' style={{ fontSize: `${fontSize}px` }}>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='/icon.png' />
                      <AvatarFallback className='bg-emerald-500 text-black dark:text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold text-black dark:text-white' style={{ fontSize: `${fontSize}px` }}>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-black dark:text-white' style={{ fontSize: `${fontSize}px` }}>
                        {m.content.includes("What is your first and last name?") ?
                          "What is your first and last name?" : m.content}
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
              className='text-black dark:text-white pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
              style={{ fontSize: `${fontSize}px` }} // Ensure this applies if Input supports style prop
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
  );
}