import { useState } from "react";
import style from "./NotesSection.module.scss";
import { BiTrashAlt as DeleteIcon } from "react-icons/bi";

const testNotes = [{ id: 1, text: "Test note 1" }];

const NotesSection = ({ plotInfo }) => {
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState(testNotes);

  const createNote = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    const text = e.target[0].value;
    const newNote = { id: notes.length + 1, text };
    setNotes([...notes, newNote]);
    setInputValue("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <section className={style.section}>
      <form onSubmit={createNote}>
        <label>
          <h3>My notes</h3>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>

      <ul className={style.notes}>
        {notes?.map((note) => (
          <li key={note.id} className={style.noteItem}>
            <p>{note.text}</p>

            <DeleteIcon
              className={style.delete}
              onClick={() => deleteNote(note.id)}
            />
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </section>
  );
};

export default NotesSection;
