"use client"

export default function ResumeView({ resume }) {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-around gap-10 mx-10 text-black'>
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
    </div>
  );
}