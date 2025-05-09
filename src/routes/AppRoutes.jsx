import { Route, Routes } from 'react-router-dom'
import { Loader } from '../components'
import MainPage from './MainPage/MainPage'
import TagsPage from './TagsPage/TagsPage'
import BookmarksPage from './BookmarksPage/BookmarksPage'
import AlertsPage from './AlertsPage/AlertsPage'
import NotesPage from './NotesPage/NotesPage'
import EnergyPage from './EnergyPage/EnergyPage'
import CertsPage from './CertsPage/CertsPage'
import TransactionsPage from './TransactionsPage/TransactionsPage'

const AppRoutes = ({ isMapLoading }) => {
  if (isMapLoading) return <Loader withBackground />

  const getPath = path => `/explore/map/${path}`

  return (
    <Routes>
      <Route path={getPath('plots')} element={<MainPage />} />
      <Route path={getPath('tags')} element={<TagsPage />} />
      <Route path={getPath('bookmarks')} element={<BookmarksPage />} />
      <Route path={getPath('alerts')} element={<AlertsPage />} />
      <Route path={getPath('notes')} element={<NotesPage />} />
      <Route path={getPath('energies')} element={<EnergyPage />} />
      <Route path={getPath('construction-certs')} element={<CertsPage />} />
      <Route path={getPath('transactions')} element={<TransactionsPage />} />
      <Route path='*' element={<MainPage />} />
    </Routes>
  )
}

export default AppRoutes
