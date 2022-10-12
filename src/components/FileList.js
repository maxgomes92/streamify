import { Card } from '@mui/material';
import { useRef } from 'react'
import "./FileList.css";

export default function FileList({ files, removeItem, selectItem }) {
  const player = useRef(new Audio())

  const previewSong = (item) => {
    if (player.current.src === item.preview_url) {
      player.current.pause()
      return
    }

    player.current.src = item.preview_url
    player.current.play()
  }

  return (
    <Card className="FileList">
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
            <button onClick={() => removeItem(fileIndex)}>X</button>
          </div>
        </div>
      ))}
    </Card>
  );
}
