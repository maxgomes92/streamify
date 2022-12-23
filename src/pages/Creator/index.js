import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import useApi from '../../helpers/useApi'
import FileList from '../../components/FileList'
import Separator from '../../components/Separator'
import './index.css'
import { Container } from '@mui/system'

export default function Creator() {
  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { loggedIn, searchForItem, createPlaylist, addToPlaylist } = useApi()

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

  const onSearch = async (newFiles) => {
    const list = [...newFiles]

    for (let file of list) {
      const { data: { tracks: { items } } } = await searchForItem(file.q)

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

    setFiles([...files, ...list])
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

    onSearch(myFiles)
  }

  const createMyPlaylist = () => {
    const uris = files.map((file) => {
      const item = file.result.find(item => item.checked)

      return item?.uri
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
      <Container style={{ maxWidth: 720 }}>
        <h1 style={{ textAlign: 'center' }}>Crie playlists a partir de músicas mp3!</h1>

        <p>
          1. Adicione suas músicas na lista <br />
          2. Escolha a versão que mais gostar <br />
          3. Crie sua playlist!
        </p>

        <Separator width={5} />

        <FileList files={files} removeItem={removeItem} selectItem={selectItem} onFilesAdded={onFilesAdded} />

        <Separator height={20} />

        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={() => setFiles([])} disabled={files.length === 0}>Limpar</Button>
          <Separator width={10} />
          <Button variant="contained" color="info" disabled={files.length === 0} onClick={createMyPlaylist}>Criar Playlist</Button>
        </div>
      </Container>
    </div>
  );
}
