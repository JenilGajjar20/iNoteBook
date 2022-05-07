import React from "react";

function Alert(props) {
  return (
    <div className={`${"bg-red-500 p-4"}`}>
      <h4 className="text-white font-semibold">{props.message}</h4>
    </div>
  );
}

export default Alert;
