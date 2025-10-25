import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addProject } from '../apiConfig/allApi';
import { toast } from 'react-toastify';

function AddOrEditProject() {
    const { pathname } = useLocation();
    const { projectId } = useParams();
    const navigate = useNavigate();
    let formFormat = ""

    if (pathname.includes("/new")) {
        formFormat = "add";
    } else {
        formFormat = "update"
    }

    const [projectData, setProjectData] = useState(formFormat === "add" ? {
        projectName: '',
        projectManager: '',
        teamMembers: [],
        startDate: '',
        endDate: '',
        status: '',
        budget: 0
    } : {})

    console.log("projectData", projectData)
    const handleSubmit = async () => {

        const {
            projectName,
            projectManager,
            teamMembers,
            startDate,
            endDate,
            status,
            budget,
        } = projectData;

        if (
            !projectName ||
            !projectManager ||
            !teamMembers ||
            !startDate ||
            !endDate ||
            !status ||
            !budget
        )
            return toast.error("Please Provide all details")

        if (formFormat === "add") {
            try {
                const response = await addProject(projectData);
                if (response.status === 200) {
                    toast.success("project Added Successfully")
                    navigate('/')
                    return
                } else {
                    return toast.error("failed to Add Project")
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleTeamMembers = (data) => {
        const formattedData = data.split(',');
        setProjectData(prev => ({ ...prev, teamMembers: formattedData }))
    }

    return (
        <main className='px-[120px] py-10 space-y-6'>
            <h1 className='text-3xl font-bold'>{formFormat === "add" ? "Add New Project" : "Edit Your Project"}</h1>
            <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="projectName" className='px-2'>
                        Project Name
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, projectName: e.target.value }))}
                        type="text"
                        placeholder='Provide Your Project Name'
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="projectManager" className='px-2'>
                        Project Manager
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, projectManager: e.target.value }))}
                        type="text"
                        placeholder='Provide Your Project Manager'
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="teamMembers" className='px-2'>
                        Team Members <span className='text-amber-400 text-sm'>(comma seperated)</span>
                    </label>
                    <input
                        onChange={(e) => handleTeamMembers(e.target.value)}
                        type="text"
                        placeholder='Provide Team Members seperated by comma eg: Rahul, Varsha ...'
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="startDate" className='px-2'>
                        Start date
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, startDate: e.target.value }))}
                        type="Date"
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="endDate" className='px-2'>
                        End Date
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, endDate: e.target.value }))}
                        type="date"
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="status" className='px-2'>
                        Project Status
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, status: e.target.value }))}
                        type="text"
                        placeholder='Provide Your Project status'
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="projectName" className='px-2'>
                        Project Budget
                    </label>
                    <input
                        onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
                        type="text"
                        placeholder='Provide Your Project Budget'
                        className='px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md'
                    />
                </div>
                <button onClick={handleSubmit}  className='px-4 py-1.5 bg-indigo-700 text-white rounded-3xl flex gap-2 items-center'> Submit</button>
            </div>
        </main>
    )
}

export default AddOrEditProject