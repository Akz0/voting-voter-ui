import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-l-2 border-t-2 border-light-purple h-8 w-8 rounded-t-full rounded-l-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
