import { useEffect, useState } from 'react'
import style from './NotesSection.module.scss'
import { BiTrashAlt as DeleteIcon } from 'react-icons/bi'
import { plotService } from '../../../service/plotService'
import Loader from '../../Loader/Loader'

const testNotes = [{ id: 1, text: 'Test note 1' }]

const NotesSection = ({ plotInfo }) => {
  const [inputValue, setInputValue] = useState('')
  const [notes, setNotes] = useState(testNotes)
  const [isLoading, setIsLoading] = useState(false)

  const createNote = async (e) => {
    e.preventDefault()
    if (!inputValue) return

    setIsLoading(true)

    await plotService.addPlotNote(plotInfo._id, inputValue)

    const allNotes = await plotService.getAllNotes(plotInfo._id)

    setNotes(allNotes.notes)

    setInputValue('')

    setIsLoading(false)
  }

  const deleteNote = async (id) => {
    setIsLoading(true)
    try {
      await plotService.removePlotNote(plotInfo._id, id)

      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {}
    setIsLoading(false)
  }

  useEffect(() => {
    if (plotInfo?._id) {
      const getAllNotes = async () => {
        const allNotes = await plotService.getAllNotes(plotInfo._id)

        setNotes(allNotes.notes)
      }

      getAllNotes()
    }
  }, [plotInfo])

  return (
    <section className={style.section}>
      {isLoading && (
        <div className={style['loader-container']}>
          <Loader />
        </div>
      )}

      <form onSubmit={createNote}>
        <label>
          <h3>Notes</h3>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter note...'
          />
        </label>
        <button type='submit'>Send</button>
      </form>

      <ul className={style.notes}>
        {notes?.map((note) => (
          <li key={note.id} className={style.noteItem}>
            <p>{note.content}</p>

            <DeleteIcon className={style.delete} onClick={() => deleteNote(note.id)} />
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </section>
  )
}

export default NotesSection
