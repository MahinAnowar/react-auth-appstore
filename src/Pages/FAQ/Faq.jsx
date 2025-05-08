import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // For alerts

// Optional: An icon for section headers or the "Ask a Question" form
const QuestionIcon = () => (
    <svg className="w-6 h-6 text-blue-500 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4h-1.044a2.5 2.5 0 00-1.941 4H10M8.228 9H7.25M8.228 9c0 1.705.67 3.286 1.777 4.437M16 12H8.25" />
    </svg>
);

const FaqItem = ({ title, content, name, defaultChecked }) => (
    <div className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <input type="radio" name={name} defaultChecked={defaultChecked} aria-label={title} />
        <div className="collapse-title text-lg font-medium text-gray-700 flex items-center">
            {title}
        </div>
        <div className="collapse-content text-gray-600 text-sm leading-relaxed px-6 pb-4">
            <p>{content}</p>
        </div>
    </div>
);


export const Faq = () => {
    const [question, setQuestion] = useState('');

    // --- useEffect for setting document title ---
    useEffect(() => {
        document.title = "FAQ - AppStore";
        // You can also set a default title for your app here in a cleanup function
        // if you navigate away, but for a single page component, this is often sufficient.
        // return () => {
        //     document.title = "AppStore"; // Or your general app title
        // };
    }, []); // Empty dependency array means this effect runs once after the initial render

    const faqData = [
        { id: 'q1', title: "What is this AppStore platform about?", content: "This AppStore platform allows users to discover, install, and review a curated selection of applications tailored to various interests. Our goal is to simplify app management and promote user engagement through a user-centric experience." },
        { id: 'q2', title: "How do I reset my password?", content: "You can reset your password by navigating to the Login page and clicking on the 'Forgot Password?' link. Follow the on-screen instructions, and a password reset link will be sent to your registered email address." },
        { id: 'q3', title: "Is my personal data secure on this platform?", content: "Absolutely. We prioritize your privacy and security. All user data, especially sensitive information like passwords, is handled with industry-standard encryption and security protocols. For more details, please review our Privacy Policy." },
        { id: 'q4', title: "Can I use the AppStore on my mobile device?", content: "Yes, the AppStore platform is designed to be fully responsive. You can access and use all its features seamlessly on desktops, tablets, and mobile smartphones." },
        { id: 'q5', title: "How can I submit an app to be featured on the AppStore?", content: "Currently, app submissions are handled by our internal curation team. However, we are planning to introduce a developer portal for app submissions in the future. Please check our 'Developer Resources' section for updates." },
        { id: 'q6', title: "Who do I contact for support or issues?", content: "If you encounter any issues or have questions, please visit our Support Center linked in the footer. You can find helpful articles or submit a support ticket to our team." }
    ];

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (question.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Question',
                text: 'Please type your question before submitting.',
            });
            return;
        }
        console.log("User question submitted:", question); 

        Swal.fire({
            icon: 'success',
            title: 'Question Submitted!',
            text: 'Thank you for your question. We will get back to you shortly if a response is needed.',
            showConfirmButton: false,
            timer: 2500
        });
        setQuestion(''); 
    };

    return (
        // The Helmet component has been removed from here
        <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            {/* --- FAQ Section --- */}
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to ask us directly.
                    </p>
                </div>

                <div className="space-y-5">
                    {faqData.map((item, index) => (
                        <FaqItem 
                            key={item.id} 
                            title={item.title} 
                            content={item.content} 
                            name="faq-accordion"
                            defaultChecked={index === 0}
                        />
                    ))}
                </div>
            </div>

            {/* --- Ask a Question Section --- */}
            <div className="max-w-2xl mx-auto mt-16 md:mt-24 p-6 sm:p-8 bg-white rounded-xl shadow-xl border border-gray-200">
                <div className="text-center mb-8">
                    <QuestionIcon />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Still Have Questions?
                    </h2>
                    <p className="text-md text-gray-600">
                        If you couldn't find your answer above, please let us know.
                    </p>
                </div>
                <form onSubmit={handleQuestionSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="userQuestion" className="sr-only">
                            Your Question
                        </label>
                        <textarea
                            id="userQuestion"
                            name="userQuestion"
                            rows="4"
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ease-in-out"
                            placeholder="Type your question here..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                        >
                            Submit Your Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};