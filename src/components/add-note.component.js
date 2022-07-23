import { useState } from "react"
import NotesService from "../services/note.service"

export const AddNotes = () => {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [state, setState] = useState({
        id: "",
        title: "",
        description: "",
        published: false,
        submitted: false
    })


    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const saveNote = () => {
        let data = {
            title: title,
            description: description
        }

        NotesService.CreateNote(data)
            .then(res => {
                setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    published: res.data.published,
                    submitted: true     
                })
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleNewNote = () => {
        setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        })
        setTitle('')
        setDescription('')
    }

    return (
        <div className="submit-form">
            {state.submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success"  onClick={handleNewNote}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={handleChangeTitle}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descrption">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={handleChangeDescription}
                            name="description"
                        />
                    </div>
                    <button onClick={saveNote} className="btn btn-success pt-1 mt-2">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )

}