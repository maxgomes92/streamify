import { useEffect, useState } from 'react'
import useApi from '../../helpers/useApi'
import MusicCollector from '../../components/FileCollector'
import FileList from '../../components/FileList'
import './index.css'

export default function Creator () {
  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { authorize, loggedIn, searchForItem, createPlaylist, addToPlaylist } = useApi()

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files))
  }, [files])

  const selectItem = (fileIndex, itemIndex) => {
    files[fileIndex].result.forEach((item, index) => {
      if (index === itemIndex) {
        files[fileIndex].result[index].checked = true
      } else {
        files[fileIndex].result[index].checked = false
      }
    })

    setFiles([...files])
  }  

  const onSearch = async () => {
    const list = [...files]

    for (let file of list) {
      const { data: { tracks: { items }}} = await searchForItem(file.q)
      file.result = items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          preview_url: item.preview_url,
          uri: item.uri,
        }
      })
    }

    setFiles(list)
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

  const createMyPlaylist = () => {
    const uris = files.map((file) => {
      const item = file.result.find(item => item.checked)
      
      return item.uri
    }).filter(o => o)

    if (uris.length === 0) {
      return
    }
    
    createPlaylist('Test 1').then(({ data: { id } }) => {
      addToPlaylist(id, { uris, position: 0 })
    })
  }

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <div style={{ textAlign: 'center' }}>
            <p>Logged in!</p>
            <MusicCollector onFilesAdded={onFilesAdded} clearList={() => setFiles([])} />
            <FileList files={files} removeItem={removeItem} selectItem={selectItem} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button onClick={onSearch}>Search</button>
            <button onClick={createMyPlaylist}>Create playlist</button>
          </div>
        </div>
      ): (
        <button onClick={authorize}>Login</button>
      )}
    </div>
  );
}
