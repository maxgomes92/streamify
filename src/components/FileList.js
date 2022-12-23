import { useRef } from 'react'
import { Button, Card } from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Separator from './Separator';
import "./FileList.css";

const AddMusicBanner = styled.a`
  flex-grow: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default function FileList({ files, removeItem, selectItem, onFilesAdded }) {
  const addMusicInputRef = useRef()
  const player = useRef(new Audio())
  const isEmpty = files.length === 0

  const previewSong = (item) => {
    if (player.current.src === item.preview_url) {
      player.current.pause()
      return
    }

    player.current.src = item.preview_url
    player.current.play()
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files).map(({ name, size }) => ({ name, size }))
    onFilesAdded(files)
  }

  const onAddMusicBannerClick = () => {
    addMusicInputRef.current.click()
  }

  return (
    <Card className="FileList" style={isEmpty ? { display: 'flex', flexDirection: 'column' } : {}}>
      <input type="file" ref={addMusicInputRef} multiple onChange={onChange} value={[]} style={{ display: 'none' }} />

      {isEmpty && (
        <AddMusicBanner onClick={onAddMusicBannerClick}>
          <div style={{ textAlign: 'center', flexGrow: 1 }}>
            Arraste suas músicas ou clique aqui!
          </div>
        </AddMusicBanner>
      )}

      {files.map(({ name, size, q, result }, fileIndex) => (
        <div className="file-item" key={name + size}>
          <div style={{ flexGrow: 1 }}>
            <p>{name}</p>
            <small>{q}</small>

            {result && (
              <div>
                <small>Results:</small>
                {result.map((item, itemIndex) => (
                  <div key={item.id}>
                    <button onClick={() => previewSong(item)}>Preview</button>
                    <input type="radio" name={q} onChange={() => selectItem(fileIndex, itemIndex)} checked={item.checked}></input>
                    <label>
                      {item.name} - {item.artist}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => removeItem(fileIndex)}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      ))}

      {!isEmpty && (
        <div style={{ textAlign: 'center' }}>
          <Separator height={10} />
          <Button color="info" onClick={onAddMusicBannerClick}>
            <AddIcon />
            Adicionar mais
          </Button>
          <Separator height={10} />
        </div>
      )}
    </Card>
  );
}
