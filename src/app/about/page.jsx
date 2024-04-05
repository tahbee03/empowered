"use client"

export default function About() {
    // TODO: Improve descriptions

    return (
        <main className="bg-white dark:text-white dark:bg-medium">
            <div className="container mx-auto px-12 py-12">
                <div className="mb-4">
                    <h1 className="font-bold text-4xl mb-2">What is EmpowerEd?</h1>
                    <p>
                        Many individuals, especially those with autism spectrum disorder (ASD) or any other intellectual disability,
                        face challenges in crafting resumes that effectively highlight their strengths and unique abilities. This often results
                        in barriers to employment opportunities. That said, EmpowerEd is designed to empowering individuals, specifically those
                        with ASD and other intellectual disabilities. Our mission is to offer a sophisticated and personalized platform designed
                        for crafting resumes that highlight their distinctive skills, ultimately facilitating their path to securing meaningful
                        employment opportunities.
                    </p>
                </div>
                <div className="mb-4">
                    <h1 className="font-bold text-4xl mb-2">Our Features</h1>
                    <p className="mb-2">
                        <span className="font-bold">AI-Powered Questionnaires: </span>
                        Utilize our smart AI to craft a resume that stands out. Answer a few simple questions and let our system generate a
                        professional resume that reflects your unique skills and experiences.
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Resume Personalization: </span>
                        Analyzes user input to offer personalized recommendations for resume content. Offers a range of adaptable templates
                        based on user preferences, ensuring unique and tailored resumes for diverse job applications.
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Accessibility Features: </span>
                        Inclusive features such as text-to-speech and community section, ensuring EmpowerEd is accessible and user-friendly for individuals with autism.
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Visual-Based Tutorials: </span>
                        Addressing potential overstimulation by minimizing text. Visuals and easy-to-follow patterns to enhance user
                        understanding. Meaningful icons reduce ambiguity and improve clarity.
                    </p>
                </div>
            </div>
        </main>
    );
}