import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { deleteProject, getAllProjects } from '../apiConfig/allApi';
import { PenBox, Plus, Trash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState({
        projectName: '',
        projectManager: '',
        teamMembers: [],
        startDate: '',
        endDate: '',
        status: '',
        budget: 0
    })
    const [error, setError] = useState(false);
    useEffect(() => {
        getAllProjectsApi();
    }, [])

    const getAllProjectsApi = async () => {
        try {
            const response = await getAllProjects();
            if (response.status === 200) {
                setProjects(response.data.project)
            } else {
                setError(true)
            }
        } catch (error) {
            setError(true)
            console.log(error);
            toast.error("Failed to retrieve Projects")
        }
    }

    const handleDelete = async (projectId) => {
        confirm("Are You Sure")
        try {
            const response = await deleteProject(projectId);
            if (response.status === 200) {
                toast.success("Project Deleted")
                getAllProjects();
            } else {
                toast.error("Failed to Delete Project")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className='px-[100px] w-screen min-h-screen bg-gray-50 flex flex-col gap-6 py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-3xl'>All Projects</h1>
                <button onClick={() => navigate('/project/new')} className='px-4 py-1.5 bg-indigo-700 text-white rounded-3xl flex gap-2 items-center'><Plus className='size-5' />Add New project</button>
            </div>
            {projects.length > 0 ?
                <table className='border-collapse'>
                    <thead className='border'>
                        <tr>
                            <th className=''>Name</th>
                            <th className=''>Managed By</th>
                            <th>Team Members</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Budget</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {
                            projects.map(project => (
                                <tr className='text-black border'>
                                    <td>{project?.projectName || "Not Available"}</td>
                                    <td>{project?.projectManager || "Not Available"}</td>
                                    <td>{project?.teamMembers.join(", ") || "Not Available"}</td>
                                    <td>{new Date(project?.startDate).toISOString().slice('T')[0] || "Not Available"}</td>
                                    <td>{new Date(project?.endDate).toISOString().slice('T')[0] || "Not Available"}</td>
                                    <td>{project?.status || "Not Available"}</td>
                                    <td>{project?.budget || "Not Available"}</td>
                                    <td>
                                        <div className='flex gap-4 justify-center'>
                                            <Link to={`/project/update/${project._id}`}>
                                                <PenBox className='size-4' />
                                            </Link>
                                            <Trash onClick={() => handleDelete(project._id)} className='size-4' />
                                        </div>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                : error ?

                    <div>
                        <h2 className='text-center w-full font-semibold text-2xl'>Failed To Retrieve Projects</h2>
                    </div>
                    :
                    <div>
                        <h2 className='text-center w-full font-semibold text-2xl'>No Project Have been added Yet</h2>
                    </div>
            }
        </main>

    )
}

export default Dashboard