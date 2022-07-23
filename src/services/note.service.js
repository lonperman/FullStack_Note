import http from "../http-common"
const baseUrl = "/notes"

const FindAll = (params) => {
    return http.get(baseUrl, { params })
}

const FindId = (id) => {
    return http.get(`${baseUrl}/${id}`)
}

const CreateNote = (data) => {
    return http.post(baseUrl, data)
}

const UpdateNote = (id, data) => {
    return http.put(`${baseUrl}/${id}`, data)
}

const DeleteId = (id) => {
    return http.delete(`${baseUrl}/${id}`)
}

const DeleteAll = () => {
    return http.delete(baseUrl)
}

const FindTitle = (title) => {
    return http.get(`${baseUrl}?title=${title}`)
}

export default {FindAll, FindId, CreateNote, UpdateNote, DeleteAll, DeleteId, FindTitle}