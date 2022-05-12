import './FileList.css'

export default function FileList ({ files }) {
  return (
    <div className="FileList">
      {files.map(({ name, size }) => (
        <div className="file-item" key={name + size}>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};
