import axios from "axios"
const baseUrl = "http://localhost:8000/api/projects"

const api = axios.create({
    baseURL : baseUrl,
    withCredentials: false
})
export const addProject = async (projectData) => {
    return await api.post('/add', projectData);
}

export const editProject = async (projectData, projectId) => {
    return await api.put(`/update/${projectId}`, projectData);
}

export const getAllProjects = async () => {
    return await api.get(`/all`);
}
export const deleteProject = async (projectId) => {
    return await api.delete(`/delete/${projectId}`);
}