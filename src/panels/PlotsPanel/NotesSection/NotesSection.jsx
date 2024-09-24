import { useEffect, useState } from 'react'
import style from './NotesSection.module.scss'
import { BiTrashAlt as DeleteIcon } from 'react-icons/bi'
import { plotService } from '../../../service/plotService'
import Loader from '../../../components/Loader/Loader'
import { useQuery } from '../../../hooks/useQuery'
import { useToastStore } from '../../../store'

const NotesSection = ({ plotInfo }) => {
  const [notes, setNotes] = useState([])
  const { loading, error, handler } = useQuery()
  const [inputValue, setInputValue] = useState('')
  const toast = useToastStore()

  const createNote = e => {
    e.preventDefault()
    if (!inputValue) return

    handler(async () => {
      const data = await plotService.addNote(plotInfo.mongo_id, inputValue)
      setInputValue('')
      if (!data?.result) return

      const updatedNotesData = await plotService.getAllNotes(plotInfo.mongo_id)
      setNotes(updatedNotesData.notes)
      toast.success(data.message)
    })
  }

  const deleteNote = async id => {
    handler(async () => {
      const data = await plotService.removeNote(plotInfo._id, id)
      if (!data?.result) return

      setNotes(notes.filter(note => note.id !== id))
      toast.success(data.message)
    })
  }

  useEffect(() => {
    if (!plotInfo?._id) return
    handler(async () => {
      const data = await plotService.getAllNotes(plotInfo._id)
      setNotes(data.notes)
    })
  }, [plotInfo])

  useEffect(() => {
    if (error) toast.error('Something went wrong. Please try again later.')
  }, [error])

  return (
    <section className={style.section}>
      {loading && (
        <div className={style['loader-container']}>
          <Loader />
        </div>
      )}

      <form onSubmit={createNote}>
        <label>
          <h3>Notes</h3>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder='Enter note...'
          />
        </label>
        <button type='submit'>Send</button>
      </form>

      <ul className={style.notes}>
        {notes?.map(note => (
          <li key={note.id} className={style.noteItem}>
            <p>{note.content}</p>

            <DeleteIcon
              className={style.delete}
              onClick={() => deleteNote(note.id)}
            />
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </section>
  )
}

export default NotesSection
