// extract the noteForm to a separate component
const NoteForm = ({onSubmit, handleChange, value}) => (
  <form onSubmit={onSubmit}>
    <input
      value={value}
      onChange={handleChange}
    />
    <button type="submit">save</button>
  </form>
)

export default NoteForm