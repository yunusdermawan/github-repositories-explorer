import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import SearchBar from './components/SearchBar.tsx'
// import UserList, { GitHubUser } from './components/UserList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchBar />
  </StrictMode>,
)
