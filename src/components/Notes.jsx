import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    console.log("Current Note:", currentNote);
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating the note: ", note);
    editNote(note.id, note.editTitle, note.editDescription, note.editTag);
    setOpenModal(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      {openModal && (
        <div className="fixed top-0 left-0 right-0 p-10 z-10 bg-[rgba(0,0,0,0.5)] h-screen">
          <div className="p-6 sm:p-10 rounded-md bg-gradient-to-r from-[#3F51B5] via-[#03A9F4] to-[#009688]">
            <div className="flex justify-between items-center pb-4 rounded">
              <div className="order-2">
                <button
                  className="text-xl text-gray-200 hover:text-white  transition-all duration-200"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <i className="far fa-times-circle"></i>
                </button>
              </div>
              <div className="">
                <h1 className="text-xl sm:text-2xl text-white font-semibold">
                  Edit Note
                </h1>
              </div>
            </div>
            <form className="space-y-4">
              <div className="rounded overflow-hidden">
                <input
                  type="text"
                  id="editTitle"
                  name="editTitle"
                  placeholder="Edit Title"
                  className="p-2 w-full focus:outline-none"
                  value={note.editTitle}
                  onChange={onChange}
                />
              </div>
              <div className="rounded overflow-hidden">
                <textarea
                  cols="30"
                  rows="5"
                  id="editDescription"
                  name="editDescription"
                  placeholder="Edit Description"
                  className="p-2 w-full focus:outline-none"
                  value={note.editDescription}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="rounded overflow-hidden">
                <input
                  type="text"
                  id="editTag"
                  name="editTag"
                  placeholder="Edit Tag"
                  className="p-2 w-full focus:outline-none"
                  value={note.editTag}
                  onChange={onChange}
                />
              </div>
              <div className="text-right">
                <button
                  className="bg-white font-bold text-[#3F51B5] py-1 px-2 rounded hover:text-white hover:bg-[#3F51B5] transition-all duration-200"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center space-y-6 pb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Your Notes
        </h2>
        {notes.length <= 0 ? (
          <p className="text-red-600 font-bold py-5 text-xl">
            You haven't entered a note yet!!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => {
              return (
                <NoteItem
                  note={note}
                  updateNote={updateNote}
                  setOpenModal={setOpenModal}
                  key={note._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Notes;
