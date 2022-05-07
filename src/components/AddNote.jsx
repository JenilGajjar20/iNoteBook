import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (note.tag === "") {
      note.tag = "default";
    }
    if (note.title === "" || note.description === "") {
      console.log("Note cannot be empty");
    } else {
      addNote(note.title, note.description, note.tag);
    }
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-6 pt-10 pb-20 px-3">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Add a Note</h2>
      <form className="space-y-4">
        <div className="border-2 border-black rounded-md overflow-hidden">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="p-2 w-full focus:outline-none"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="border-2 border-black rounded-md overflow-hidden">
          <textarea
            cols="30"
            rows="5"
            id="description"
            name="description"
            placeholder="Enter Description"
            className="p-2 w-full focus:outline-none"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          ></textarea>
        </div>
        <div className="border-2 border-black rounded-md overflow-hidden">
          <input
            type="text"
            id="tag"
            name="tag"
            placeholder="Enter Tag"
            className="p-2 w-full focus:outline-none"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="text-center">
          <button
            className={`${
              note.title.length <= 5 || note.description.length <= 5
                ? "cursor-not-allowed ring-2 ring-[#8998ef] text-gray-400 rounded-md sm:text-lg font-semibold py-1 px-6"
                : "ring-2 ring-[#3F51B5] hover:bg-[#03A9F4] hover:text-white transition-all duration-300 rounded-md sm:text-lg font-semibold py-1 px-6"
            }`}
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
