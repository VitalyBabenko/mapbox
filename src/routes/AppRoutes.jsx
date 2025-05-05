import { Route, Routes } from 'react-router-dom'
import { Loader } from '../components'
import MainPage from './MainPage/MainPage'
import TagsPage from './TagsPage/TagsPage'
import BookmarksPage from './BookmarksPage/BookmarksPage'
import AlertsPage from './AlertsPage/AlertsPage'
import NotesPage from './NotesPage/NotesPage'
// import EnergyPage from './EnergyPage/EnergyPage'

const AppRoutes = ({ isMapLoading }) => {
  if (isMapLoading) return <Loader withBackground />

  return (
    <Routes>
      <Route path='/explore/map/plots' element={<MainPage />} />
      <Route path='/explore/map/tags' element={<TagsPage />} />
      <Route path='/explore/map/bookmarks' element={<BookmarksPage />} />
      <Route path='/explore/map/alerts' element={<AlertsPage />} />
      <Route path='/explore/map/notes' element={<NotesPage />} />
      {/* <Route path='/explore/map/energies' element={<EnergyPage />} /> */}
    </Routes>
  )
}

export default AppRoutes
