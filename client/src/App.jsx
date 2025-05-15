import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/page'
import Home from './pages/home/page'
import Login from './pages/login/page'
import Patient from './pages/patient/page'
import Vitals from './pages/vitals/page'
import Diagnosis from './pages/diagnosis/page'
import Recommend from './pages/recommend/page'
import Report from './pages/patient_summary/page'
import History from './pages/history/page'
import Encyclopedia from './pages/encyclopedia/page'
import EncyclopediaDetail from './pages/encyclopedia_detail/page'
import PageNotFound from './pages/not_found/page'
import Register from './pages/register/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/patient' element={<Patient />} />
        <Route path='/vitals' element={<Vitals />} />
        <Route path='/diagnosis' element={<Diagnosis />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/patient-summary/:id' element={<Report />} />
        <Route path='/history' element={<History />} />
        <Route path='/encyclopedia' element={<Encyclopedia />} />
        <Route path='/encyclopedia-detail/:id' element={<EncyclopediaDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
