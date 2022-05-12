import "./FileList.css";

export default function FileList({ files, removeItem }) {
  return (
    <div className="FileList">
      {files.map(({ name, size, q }, i) => (
        <div className="file-item" key={name + size}>
          <div style={{ flexGrow: 1 }}>
            <p>{name}</p>
            <small>{q}</small>
          </div>
          <div>
            <button onClick={() => removeItem(i)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
