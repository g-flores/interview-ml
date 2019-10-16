import React from "react";

function Container({ children, className }) {
  return (
    <div className={`w-90 mw8-ns center ${className || ""}`}>{children}</div>
  );
}

export default Container;
