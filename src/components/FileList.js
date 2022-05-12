import { useRef } from 'react'
import "./FileList.css";

export default function FileList({ files, removeItem }) {
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
    <div className="FileList">
      {files.map(({ name, size, q, result }, i) => (
        <div className="file-item" key={name + size}>
          <div style={{ flexGrow: 1 }}>
            <p>{name}</p>
            <small>{q}</small>

            {result && (
              <div>
                <small>Results:</small>
                {result.map((item) => (
                  <div>
                    <button onClick={() => previewSong(item)}>Preview</button>
                    <input type="radio"></input>
                    <label>
                      {item.name} - {item.artist}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <button onClick={() => removeItem(i)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
