import { useEffect, useState } from 'react'
import useApi from './helpers/useApi'
import MusicCollector from './components/FileCollector'
import FileList from './components/FileList'
import './App.css'

function App() {
  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { authorize, loggedIn, getPlaylists, searchForItem } = useApi()

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files))
  }, [files])

  const getMyPlaylists = () => {
    getPlaylists().then(console.log)
  }

  const search = () => {
    searchForItem('pais e filhos')
  }

  const removeItem = (i) => {
    files.splice(i, 1)
    setFiles([...files])
  }

  const onFilesAdded = (newFiles) => {
    const myFiles = newFiles.filter((file) => {
      return !files.find((f) => f.name === file.name)
    }).map((f) => {
      f.q = f.name
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .split('.')[0]
      return f
    })

    setFiles([...files, ...myFiles])
  }

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <div style={{ textAlign: 'center' }}>
            <p>Logged in!</p>
            <MusicCollector onFilesAdded={onFilesAdded} clearList={() => setFiles([])} />
            <FileList files={files} removeItem={removeItem} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button>Search</button>
          </div>
        </div>
      ): (
        <button onClick={authorize}>Login</button>
      )}
    </div>
  );
}

export default App;
