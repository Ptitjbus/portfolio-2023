import './css/App.css'
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import HomePage from './HomePage'
import ContactPage from './ContactPage'
import ProjectDetails, { loadProjectData } from './ProjectDetails'
import ProjectsPage, { loadProjectsData } from './ProjectsPage'
import Error404Page from './Error404Page'

window.baseUrl = 'https://mysterious-atoll-84798.herokuapp.com';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:id" element={< ProjectDetails />} loader={loadProjectData} />
      <Route path="/projects" element={<ProjectsPage />} loader={loadProjectsData} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Error404Page />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App
