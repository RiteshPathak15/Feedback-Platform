import React, { useState } from 'react';

const faqData = [
  {
    question: "Why does this program exist?",
    answer: "Brands and retailers value customer feedback about their products, and so do other customers. TryIt Sampling allows invited participants to provide honest and unbiased feedback on new or currently sold products in an effort to help consumers make more informed purchase decisions."
  },
  {
    question: "How do I become a member?",
    answer: "To become a member, you need to follow the registration process on our platform. More details can be found on our membership page."
  },
  {
    question: "Why does the registration form / member profile request information about me?",
    answer: "The registration form requests personal information to better match you with products and services suited to your preferences."
  },
  {
    question: "How many accounts can I have at the same household?",
    answer: "Each household is limited to one account to ensure fair distribution of samples and rewards."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <div
              className="flex justify-between items-center py-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-semibold">Q</span>
                <span className="text-lg">{item.question}</span>
              </div>
              <span className="text-blue-500 text-2xl">
                {openIndex === index ? '-' : '+'}
              </span>
            </div>
            {openIndex === index && (
              <div className="pl-8 pb-4">
                <div className="flex space-x-2">
                  <span className="text-blue-500 font-semibold">A</span>
                  <span className="text-gray-700">{item.answer}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
