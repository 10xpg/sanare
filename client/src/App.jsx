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
import { OrthodoxEncyclopediaDetail, TraditionalEncyclopediaDetail } from './pages/encyclopedia_detail/page'
import PageNotFound from './pages/not_found/page'
import Register from './pages/register/page'
import ProtectRoute from './components/Secure/ProtectRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/home'
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path='/patient'
          element={
            <ProtectRoute>
              <Patient />
            </ProtectRoute>
          }
        />
        <Route
          path='/vitals'
          element={
            <ProtectRoute>
              <Vitals />
            </ProtectRoute>
          }
        />
        <Route
          path='/diagnosis'
          element={
            <ProtectRoute>
              <Diagnosis />
            </ProtectRoute>
          }
        />
        <Route
          path='/recommend'
          element={
            <ProtectRoute>
              <Recommend />
            </ProtectRoute>
          }
        />
        <Route
          path='/patient-summary/:id'
          element={
            <ProtectRoute>
              <Report />
            </ProtectRoute>
          }
        />
        <Route
          path='/history'
          element={
            <ProtectRoute>
              <History />
            </ProtectRoute>
          }
        />
        <Route
          path='/encyclopedia'
          element={
            <ProtectRoute>
              <Encyclopedia />
            </ProtectRoute>
          }
        />
        <Route
          path='/encyclopedia-od-detail/:id'
          element={
            <ProtectRoute>
              <OrthodoxEncyclopediaDetail />
            </ProtectRoute>
          }
        />
        <Route
          path='/encyclopedia-td-detail/:id'
          element={
            <ProtectRoute>
              <TraditionalEncyclopediaDetail />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
