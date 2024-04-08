"use client"
import React, { useState,useEffect } from 'react';
import ResumePage from '../resume/page';
import Chat from "../../components/ui/chat"
const FinalResumePage = () => {
  const [resume, setResume] = useState(null);

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
    <button onClick={downloadLaTeX} className="p-2 border rounded text-lg bg-green-500 text-white hover:bg-green-600">
      Download Resume
    </button>
  </div>

  {/* Assuming Chat is another component */}
  <div style={{ width: '600px', height: '800px' }}>
  <Chat />
</div>

</div>
  
  );
}

export default FinalResumePage;
