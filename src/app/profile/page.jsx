"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import moment from "moment";
import ResumeView from "../../components/ResumeView";

export default function Profile() {
  const [resumes, setResumes] = useState(null); // Stores resumes fetched from back-end
  const [view, setView] = useState(null); // Stores resume to be showcased
  const { data: session } = useSession(); // Contains the data of the user currently signed in

  useEffect(() => {
    // Fetches all resumes from back-end
    async function fetchResumes() {
      try {
        const response = await fetch("/api/resumes");
        const data = await response.json();

        if (response.ok) setResumes(data.filter((r) => (r.owner == session.user.id)));
      } catch (error) {
        console.log(error);
      }
    }

    if (session) fetchResumes();
  }, [session]);

  if (resumes) { // Conditional rendering if resumes have already loaded
    return (
      <main className="bg-white dark:text-white dark:bg-medium">
        <div className="container mx-auto px-6 py-12">
          <h1 className="font-bold text-4xl mb-2">Your Resumes</h1>
          <div>
            {(resumes.length == 0) ? (
              <p>You have no saved resumes.</p>
            ) : (
              resumes.map((r, i) => (
                <>
                  <div
                    key={i}
                    className="hover:bg-[#501616] dark:hover:bg-[#CCA677] text-black dark:text-white p-4 my-2 rounded cursor-pointer shadow-lg"
                    onClick={() => setView(r._id)}
                  >
                    <p className="font-bold">Resume ID: {r._id}</p>
                    <p className="italic">Created on {moment(r.createdAt).format("MMMM Do YYYY")} at {moment(r.createdAt).format("h:mm:ss a")}</p>
                    <p>CLICK TO VIEW</p>
                  </div>
                  {(view == r._id) && (
                    <ResumeView resume={r} />
                  )}
                </>
              ))
            )}
          </div>
        </div>
      </main>
    );
  } else { // Conditional rendering if resumes have not loaded
    return (
      <p>Loading...</p>
    );
  }
}