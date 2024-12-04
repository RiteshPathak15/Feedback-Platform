// frontend/src/pages/ErrorPage.jsx
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
