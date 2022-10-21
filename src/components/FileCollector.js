export default function FileCollector({ onFilesAdded, clearList }) {
  const onChange = (e) => {
    const files = Array.from(e.target.files).map(({ name, size }) => ({ name, size }))
    onFilesAdded(files)
  }

  return (
    <div>
      <input type="file" multiple onChange={onChange} value={[]} />
    </div>
  )
}