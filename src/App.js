import { useEffect, useState } from 'react'
import useApi from './helpers/useApi'
import MusicCollector from './helpers/components/FileCollector'
import FileList from './helpers/components/FileList'
import './App.css'

function App() {
  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { authorize, loggedIn, getPlaylists, searchForItem } = useApi()

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files.map(({ name, size }) => ({ name, size }))))
  }, [files])

  const getMyPlaylists = () => {
    getPlaylists().then(console.log)
  }

  const search = () => {
    searchForItem('pais e filhos')
  }

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <div style={{ textAlign: 'center' }}>
            <p>Logged in!</p>
            <MusicCollector onFilesAdded={(myFiles) => setFiles([...files, ...myFiles])} clearList={() => setFiles([])} />
            <FileList files={files} />
          </div>
        </div>
      ): (
        <button onClick={authorize}>Login</button>
      )}
    </div>
  );
}

export default App;
