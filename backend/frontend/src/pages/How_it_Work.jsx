import React from "react";
import List_of_work from "../components/List_of_work";
import FAQ from "../components/FAQ";
import More_reviews from "./assets/More_reviews.png"

const How_it_Work = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        {/* Container for Text Content */}
        <div className="text-center flex flex-col items-center max-w-xl">
          <h1 className="text-4xl font-bold text-blue-900 leading-tight">
            Sample{" "}
            <span className="underline decoration-blue-600">free products</span>{" "}
            &<br />
            share your opinion.
          </h1>
          <p className="mt-4 text-gray-600">
            Join the TryIt sampling community to receive free products from
            leading brands. Write reviews to share your honest opinion and help
            other consumers buy better.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
            Apply
          </button>
        </div>

        {/* Right-Side Image */}
        <div className="ml-8 mt-16">
          <img
            src={More_reviews}
            alt="Product"
            className="h-1/5 w-50" // Adjust width for better size control
          />
        </div>
      </div>
      <List_of_work/>
      <FAQ/>
    </>
  );
};

export default How_it_Work;
