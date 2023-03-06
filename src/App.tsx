import Account from './pages/RequestForm';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import './style/supercontainer.css'
import RequestFormSubmitSuccess from './pages/successpages/RequestFormSubmitSuccess';
import NotFound from './pages/errorpages/NotFound';

function App() {
  return <>
    <div className="supercontainer">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/project">
          <Route path="add" element={<Account/>} />
          <Route path="add/success" element={<RequestFormSubmitSuccess/>} />
          <Route path="search" element={<SearchPage />} />
          <Route path="get" element={<ProjectDetails/>} />
        </Route>
        <Route path="/NotFound" element={<NotFound/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  </>
}

export default App;