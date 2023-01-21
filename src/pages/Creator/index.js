import { useEffect, useState } from 'react'
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import useApi from '../../helpers/useApi'
import FileList from '../../components/FileList'
import Separator from '../../components/Separator'
import './index.css'
import { Container } from '@mui/system'

export default function Creator() {
  const [alertMsg, setAlertMsg] = useState('')
  const [snackMsg, setSnackMsg] = useState('')

  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { searchForItem, createPlaylist, addToPlaylist } = useApi()

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
    const name = document.getElementById('name').value

    if (!name) {
      setAlertMsg('Obrigatório preencher nome da playlist.')
      return
    }

    const uris = files.map((file) => {
      const item = file.result.find(item => item.checked)

      return item?.uri
    }).filter(o => o)

    if (uris.length === 0) {
      return
    }

    createPlaylist(null)
      .then(({ data: { id } }) => {
        addToPlaylist(id, { uris, position: 0 })
      })
      .catch((err) => {
        setSnackMsg(err.message)
      })
  }

  const getCreatePlaylistDisabled = () => {
    return files.length === 0 || !files.some(file => {
      return file.result.some(({ checked }) => checked)
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

        <Separator height={5} />

        <TextField label="Nome da playlist" variant="filled" fullWidth id="name" onChange={() => setAlertMsg('')} />

        {!!alertMsg && <Alert severity="error">{alertMsg}</Alert>}

        <Separator height={10} />

        <p style={{ margin: 0, textAlign: 'right' }}>{files.length}/100</p>
        <FileList files={files} removeItem={removeItem} selectItem={selectItem} onFilesAdded={onFilesAdded} />

        <Separator height={20} />

        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={() => setFiles([])} disabled={files.length === 0}>Limpar</Button>
          <Separator width={10} />
          <Button variant="contained" color="info" disabled={getCreatePlaylistDisabled()} onClick={createMyPlaylist}>Criar Playlist</Button>
        </div>
      </Container>

      <Snackbar open={!!snackMsg} autoHideDuration={6000} onClose={() => setSnackMsg('')}>
        <Alert onClose={() => setSnackMsg('')} severity="error">
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
