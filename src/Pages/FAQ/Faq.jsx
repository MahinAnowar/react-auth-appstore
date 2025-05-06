import React from 'react'

export const Faq = () => {
return (
    <div className="p-6 bg-gray-100 py-[40px]">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title font-semibold">What is this application about?</div>
                    <div className="collapse-content text-sm">
                        This application helps users manage their app store accounts and access various features securely.
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">How do I reset my password?</div>
                    <div className="collapse-content text-sm">
                        You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">Is my data secure?</div>
                    <div className="collapse-content text-sm">
                        Yes, we use industry-standard encryption to ensure your data is safe and secure.
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">Can I access this app on mobile devices?</div>
                    <div className="collapse-content text-sm">
                        Yes, this application is fully responsive and works seamlessly on mobile devices.
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold">How do I contact support?</div>
                    <div className="collapse-content text-sm">
                        You can contact our support team by clicking on the "Contact Us" link in the footer of the application.
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
