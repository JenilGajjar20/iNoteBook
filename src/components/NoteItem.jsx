import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const { note, setOpenModal, updateNote } = props;

  return (
    <div className="border-2 border-black rounded py-3 px-4 relative space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold">{note.title}</h4>
        <i
          className="far fa-trash-alt text-red-900 hover:text-red-600"
          onClick={() => {
            deleteNote(note._id);
          }}
        ></i>
      </div>
      <p className="font-semibold">{note.description}</p>
      <p className="font-medium pb-6 text-gray-400">#{note.tag}</p>
      <i
        className="far fa-edit absolute right-0 bottom-0 p-4 text-blue-900 hover:text-blue-600"
        onClick={() => {
          setOpenModal(true);
          updateNote(note);
        }}
      ></i>
    </div>
  );
}

export default NoteItem;
