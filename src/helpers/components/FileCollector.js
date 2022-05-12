export default function FileCollector ({ onFilesAdded, clearList }) {
  return (
    <div>
      <input type="file" multiple onChange={(e) => onFilesAdded(e.target.files)} />
      <button onClick={() => clearList()}>Clear List</button>
    </div>
  )
}