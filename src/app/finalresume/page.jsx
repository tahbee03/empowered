"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CloudConvert from 'cloudconvert';
import fs from 'fs';
import https from 'https';

const cloudConvert = new CloudConvert('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTRkNmIzZDJkZTlkZjk0ZTAwZWQ4MDUyYzM0MDNkZDc2ZmYzNWJhMjQyY2M4ZDE4NGU3ZGRkZTc4YjU1YzdiYjQ4YjNlNTgxNDhlNWI4YzYiLCJpYXQiOjE3MTU0NTc4NDguODg5MDQ5LCJuYmYiOjE3MTU0NTc4NDguODg5MDUsImV4cCI6NDg3MTEzMTQ0OC44ODQyOCwic3ViIjoiNjgzMTgwNzEiLCJzY29wZXMiOlsidXNlci5yZWFkIiwidXNlci53cml0ZSIsInRhc2sucmVhZCIsInRhc2sud3JpdGUiLCJ3ZWJob29rLnJlYWQiLCJ3ZWJob29rLndyaXRlIiwicHJlc2V0LnJlYWQiLCJwcmVzZXQud3JpdGUiXX0.NMlya_zszp2jZ9JqU4cL1ind7FWm0wA1sdrvQrcWoE5SsD4y6M2r_k5Nf6RU0ZRiRqYDkjDrmZGY28Jx-pGgk1qeV5lXuBgcuwl8sc7PBhafu76XAMq8dRdjtgHd1VDzRE8SYckIYDIrbh3y2tPuUMxhiYK6MROgkFBlx6eqNODHl5tJwZzyNixQlltDdCllPYis7lwhh445nUiHQ8a9v5cIvbbWMxEFO9fTSgQ3qnN2o0rDII1I2VoiKJali2P0f0ycDTx8sdEj8NzOhFkCC5sM23hUgYmkSkmK8WIjCQJ_pZ6bVAzfDHbTyv3QIOaRuDN4bwq7VYPfx4SMyiTO1OCbpMR-PmPzQ6-5_xJwbI8xl6SkoInJGRwEtxnQCQf8ndtCnb4JGNnhCRXAQq-s7-Lc0Bf9asKDi9SrnuVYR8uzmkd0qTufJkumbH4UJ6XRqdYTmeEn6_fZCnr5Z4i-UkOrVn8GOJd08cS8T0xkphJA4gQ69x-fJDU4U2Q6HLs3SxQIeWLQNYq_kFrQS8Yq-t5i0hGOpsFfxq2HfASffU_S4z0BzfC9UhGwgrVijAOhJp1rqquel6kKLDQ09GsfzYZ6rtKjzWiuSnhJpGdb4-vxP6mgFv1EhkdNvc-DK0upc_xQcBozwbIxtFUmVSIjZUyeUEA62o5yBsmoCptIF3E');

const FinalResumePage = () => {
  const [resume, setResume] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const storedResumeData = localStorage.getItem('resumeData');
    if (storedResumeData) {
      const parsedData = JSON.parse(storedResumeData);

      setResume(parsedData);
    }
  }, []);

  if (!resume) {
    return <div>Loading...</div>;
  }

  const generateLaTeX = (resumeData) => {
    let latex = `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${resumeData.name}} \\\\ \\vspace{1pt}
    \\small ${resumeData.phone} $|$ \\href{mailto:${resumeData.email}}{\\underline{${resumeData.email}}} $|$
   
\\end{center}


%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {${resumeData.education.school}}{${resumeData.education.end_date}}
      {${resumeData.education.degree}}{${resumeData.education.start_date} -- ${resumeData.education.end_date}}
  \\resumeSubHeadingListEnd

  %-----------EXPERIENCE-----------
  \\section{Experience}
    \\resumeSubHeadingListStart
      ${resumeData.work_experience.map(exp => `
      \\resumeSubheading
        {${exp.job_title}}{${exp.start_date} -- ${exp.end_date}}
        {${exp.company}}{${exp.start_date} -- ${exp.end_date}}
        \\resumeItemListStart
        ${exp.responsibilities}
        \\resumeItemListEnd
      `).join('')}
    \\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${resumeData.skills.map(skill => `\\textbf{${skill}}`).join(', ')} 
    }}
\\end{itemize}

\\end{document}
    `;
    return latex;
  };

  const downloadLaTeX = () => {
    const latex = generateLaTeX(resume);
    const blob = new Blob([latex], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "resume.tex";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setIsDownloaded(true);
  };

  const saveResume = async () => {
    try {
      // Push resume data to back-end
      const response = await fetch("/api/resumes", {
        method: "POST",
        body: JSON.stringify({
          owner: session.user.id,
          ...resume
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.json();
      if (response.ok) {
        console.log("Resume saved successfully!");
        setIsSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const convertToPDF = async () => {
    try {
      // Generate LaTeX content
      const latex = generateLaTeX(resume);
      // Create a temporary TeX file
      //fs.writeFileSync('resume.tex', latex);

      // Create the conversion job
      const job = await cloudConvert.jobs.create({
        tasks: {
          'upload-my-file': {
            operation: "import/raw",
            file: latex,
            filename: "resume.tex"
          },
          'convert-to-pdf': {
            operation: 'convert',
            input_format: 'tex',
            output_format: 'pdf',
            engine: 'texlive',
            input: ['upload-my-file']
          },
          'export-1': {
            operation: 'export/url',
            input: ['convert-to-pdf']
          }
        },
        tag: 'jobbuilder'
      });

      // Upload the TeX file
      // const uploadTask = job.tasks.filter(task => task.name === 'upload-my-file')[0];
      // const inputFile = fs.createReadStream('resume.tex');
      // await cloudConvert.tasks.upload(uploadTask, inputFile, 'resume.tex');

      // Wait for job completion
      const completedJob = await cloudConvert.jobs.wait(job.id);

      // Get export URLs
      const file = cloudConvert.jobs.getExportUrls(completedJob)[0];

      // Download the PDF file
      const link = document.createElement('a');
      link.href = file.url;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Conversion to PDF completed successfully!');
      setIsDownloaded(true);
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };
  return (
    <div className='flex flex-col lg:flex-row lg:justify-around gap-10 mx-10'>

      <div className="flex-grow bg-white p-8 shadow-lg border border-gray-200 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 border-b pb-2">{resume.name}</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">{resume.email}</p>
          <p className="text-lg">{resume.phone}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 border-b">Education</h2>
          {Array.isArray(resume.education) ? resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-xl font-medium">{edu.degree} at {edu.school}</p>
              <p>GPA: {edu.gpa}</p>
              <p>{edu.start_date} - {edu.end_date}</p>
            </div>
          )) : (
            <div className="mb-4">
              <p className="text-xl font-medium">{resume.education.degree} at {resume.education.school}</p>
              <p>GPA: {resume.education.gpa}</p>
              <p>{resume.education.start_date} - {resume.education.end_date}</p>
            </div>
          )}
        </div>


        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 border-b">Work Experience</h2>
          {resume.work_experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="text-xl font-medium">{exp.job_title} at {exp.company}</p>
              <p>{exp.responsibilities}</p>
              <p>{exp.start_date} - {exp.end_date}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 border-b">Skills</h2>
          <ul className="list-disc list-inside">
            {resume.skills.map((skill, index) => (
              <li key={index} className="text-lg">{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-grow-0">
        <button
          onClick={saveResume}
          className="p-2 border rounded text-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-slate-500"
          disabled={isSaved}
        >
          {(isSaved) ? "Saved!" : "Save to Profile"}
        </button>
      </div>

      <div className="flex-grow-0">
        <button
          onClick={convertToPDF}
          className="p-2 border rounded text-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-slate-500"
          disabled={isDownloaded}
        >
          {(isDownloaded) ? "Downloaded!" : "Download Resume"}
        </button>
      </div>



    </div>

  );
}

export default FinalResumePage;
