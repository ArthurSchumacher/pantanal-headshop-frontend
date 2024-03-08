import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

function SmallContainer({ children }: FormContainerProps) {
  return (
    <div className="w-full mx-auto max-w-screen-md sm:py-16 py-8">
      {children}
    </div>
  );
}

export default SmallContainer;
