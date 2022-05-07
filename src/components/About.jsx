import React from "react";

function About() {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">About iNoteBook📝</h2>
        <p className="text-lg">
          This web application is created using <strong>React.js</strong> with{" "}
          <strong>Tailwind CSS</strong>. The database is{" "}
          <strong>MongoDB</strong> for storing the user data and the notes added
          by particular user.
        </p>
        <p className="text-lg">
          You can add your note with{" "}
          <em>
            <strong>title</strong>
          </em>
          ,{" "}
          <em>
            <strong>description</strong>
          </em>{" "}
          and{" "}
          <em>
            <strong>tag (optional)</strong>
          </em>
          . You can also edit the note, delete the note whenever you need.
        </p>
      </div>
    </div>
  );
}

export default About;
