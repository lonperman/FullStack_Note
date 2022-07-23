import { useEffect, useState } from "react"
import NoteService from "../services/note.service"
import { useNavigate, useParams } from "react-router-dom";




const Note = () => {

    let { id } = useParams()
    const history = useNavigate()
    const initialNoteState = {
        id: null,
        title: "",
        description: "",
        published: false
    }
    const [currentNote, setCurrentNote] = useState(initialNoteState)
    const [message, setMessage] = useState("")

    const getNote = (id) => {
        NoteService.FindId(id)
            .then(res => {
                setCurrentNote(res.data)
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getNote(id)
    }, [id]) 

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentNote({ ...currentNote, [name]: value })
    }

    const updatePublished = (status) => {
        let data = {
            id: currentNote.id,
            title: currentNote.title,
            description: currentNote.description,
            published: status
        }

        NoteService.UpdateNote(currentNote.id, data)
            .then(res => {
                setCurrentNote({ ...currentNote, published: status })
                console.log(res.data)
                setMessage("Updated Successfully")
            })
            .catch(e => {
                console.log(e)
            })
    }

    const updateNote = () => {
        NoteService.UpdateNote(currentNote.id, currentNote)
            .then(res => {
                console.log(res.data)
                setMessage("Updated Successfully")
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteNote = () => {
        NoteService.DeleteId(currentNote.id)
            .then(res => {
                console.log(res.data)
                history("/notes")
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            {currentNote ? (
                <div className="edit-form">
                    <h4>Note</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentNote.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentNote.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    {currentNote.published ? (
                        <button
                            className="badge btn-secondary m-1"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge btn btn-warning m-1"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge btn btn-danger m-1" onClick={deleteNote}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge btn btn-success"
                        onClick={updateNote}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    )
}

export default Note