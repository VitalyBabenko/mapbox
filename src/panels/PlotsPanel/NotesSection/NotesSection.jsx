import { useEffect, useState } from 'react'
import style from './NotesSection.module.scss'
import { BiTrashAlt as DeleteIcon } from 'react-icons/bi'
import { plotService } from '../../../service/plotService'
import Loader from '../../../components/Loader/Loader'
import { useQuery } from '../../../hooks/useQuery'
import { useToastStore } from '../../../store'
import { useLocale } from '../../../hooks/useLocale'

const NotesSection = ({ plotInfo }) => {
  const { t } = useLocale('panels.plots')
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
      const data = await plotService.removeNote(id)
      if (!data?.result) return

      setNotes(notes.filter(note => note.id !== id))
      toast.success(data.message)
    })
  }

  useEffect(() => {
    if (!plotInfo?.mongo_id) return
    handler(async () => {
      const data = await plotService.getAllNotes(plotInfo.mongo_id)
      setNotes(data.notes)
    })
  }, [plotInfo])

  useEffect(() => {
    if (error) toast.error(t('notesError'))
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
          <h3>{t('notes')}</h3>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={t('enterNote')}
          />
        </label>
        <button type='submit'>{t('send')}</button>
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
    </section>
  )
}

export default NotesSection
