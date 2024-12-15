import React from "react";
import box_close from "../assets/box_close.png"
import step_1_card_tablet from "../assets/step-1-card_tablet.png"
import step_2_card_tablet from "../assets/step-2-card_tablet.png"
import step_3_review_card_tablet from "../assets/step-3-review-card_tablet.png"
import box_open from "../assets/box_open.png"

const List_of_work = () => {
  return (
    <>
      {/* Decorative Icon and Text */}
      <div className="flex flex-col items-center mt-16 ">
        <img
          src={box_close}
          alt="How it works icon"
          className="h-14"
        />
        <p className="text-lg font-semibold text-blue-500">HOW IT WORKS</p>
      </div>
      <div className="flex justify-center min-h-screen bg-white py-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Vertical Divider Line */}
          <div className="absolute inset-0 flex justify-center">
            <div className="h-full border-l-2 border-gray-300"></div>
          </div>

          {/* Information Blocks 1 */}
          <img
            src={step_1_card_tablet}
            alt="Login Card"
            className="relative"
          />
          <div className="flex w-full items-center mb-16">
            <div className="w-1/2 pr-8 text-right">
              <p className="text-blue-600 text-lg font-bold">01</p>
              <h2 className="text-2xl font-semibold text-blue-900">
                Build your profile.
              </h2>
              <p className="text-gray-600 mt-2">
                Take a few minutes and tell us about yourself and your
                interests.
              </p>
            </div>
            <div className="w-1/2"></div>
          </div>

          {/* Information Blocks 2 */}
          <img
            src={step_2_card_tablet}
            alt="Login Card"
            className="relative top-5 p-4"
          />
          <div className="flex w-full items-center mb-16">
            <div className="w-1/2"></div>
            <div className="w-1/2 pl-8 text-left">
              <p className="text-blue-600 text-lg font-bold">02</p>
              <h2 className="text-2xl font-semibold text-blue-900">
                Discover new products.
              </h2>
              <p className="text-gray-600 mt-2">
                Find new products curated to your preferences and tastes.
              </p>
            </div>
          </div>

          {/* Information Blocks 3 */}
          <img
            src={step_3_review_card_tablet}
            alt="Login Card"
            className="relative top-5 p-4"
          />
          <div className="flex w-full items-center mb-16">
            <div className="w-1/2 pr-8 text-right">
              <p className="text-blue-600 text-lg font-bold">03</p>
              <h2 className="text-2xl font-semibold text-blue-900">
                Share your feedback.
              </h2>
              <p className="text-gray-600 mt-2">
                Help us and others by sharing your honest opinions.
              </p>
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
      </div>
      {/* Decorative Icon and Text */}
      <div className="flex flex-col items-center pb-4">
        <img
          src={box_open}
          alt="How it works icon"
          className="h-14"
        />
        <p className="text-lg font-semibold text-blue-500">Join US</p>
      </div>
    </>
  );
};

export default List_of_work;
