import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addProject, editProject, getAllProjects } from '../apiConfig/allApi';
import { toast } from 'react-toastify';

function AddOrEditProject() {
    const { pathname } = useLocation();
    const { projectId } = useParams();
    const navigate = useNavigate();

    // Determine form type (add / update)
    const formFormat = pathname.includes('/new') ? 'add' : 'update';

    const [projects, setProjects] = useState([]);
    const [projectData, setProjectData] = useState({
        projectName: '',
        projectManager: '',
        teamMembers: [],
        startDate: '',
        endDate: '',
        status: '',
        budget: 0,
    });

    // Fetch all projects
    const getAllProjectsApi = async () => {
        try {
            const response = await getAllProjects();
            if (response.status === 200) {
                setProjects(response.data.project);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to retrieve Projects');
        }
    };

    useEffect(() => {
        getAllProjectsApi();
    }, []);

    // Set current project data in edit mode
    useEffect(() => {
        if (formFormat === 'update' && projects.length > 0) {
            const foundProject = projects.find((p) => p._id === projectId);
            if (foundProject) {
                setProjectData(foundProject);
            }
        }
    }, [projects, projectId, formFormat]);

    const handleTeamMembers = (data) => {
        const formattedData = data.split(',').map((m) => m.trim());
        setProjectData((prev) => ({ ...prev, teamMembers: formattedData }));
    };

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
            !teamMembers.length ||
            !startDate ||
            !endDate ||
            !status ||
            !budget
        ) {
            return toast.error('Please provide all details');
        }

        try {
            if (formFormat === 'add') {
                const response = await addProject(projectData);
                if (response.status === 201) {
                    toast.success('Project added successfully');
                    navigate('/');
                } else {
                    toast.error('Failed to add project');
                }
            } else {
                const response = await editProject(projectData, projectId);
                if (response.status === 200) {
                    toast.success('Project updated successfully');
                    navigate('/');
                } else {
                    toast.error('Failed to update project');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <main className="px-[120px] py-10 space-y-6">
            <h1 className="text-3xl font-bold">
                {formFormat === 'add' ? 'Add New Project' : 'Edit Project'}
            </h1>

            <div className="space-y-4">
                {/* Project Name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectName" className="px-2">
                        Project Name
                    </label>
                    <input
                        value={projectData.projectName}
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                projectName: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="Provide your project name"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* Project Manager */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectManager" className="px-2">
                        Project Manager
                    </label>
                    <input
                        value={projectData.projectManager}
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                projectManager: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="Provide your project manager"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* Team Members */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="teamMembers" className="px-2">
                        Team Members{' '}
                        <span className="text-amber-400 text-sm">(comma separated)</span>
                    </label>
                    <input
                        value={projectData.teamMembers.join(', ')}
                        onChange={(e) => handleTeamMembers(e.target.value)}
                        type="text"
                        placeholder="Provide team members separated by commas (e.g., Rahul, Varsha)"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="startDate" className="px-2">
                        Start Date
                    </label>
                    <input
                        value={projectData.startDate?.slice(0, 10)} // format ISO date
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                startDate: e.target.value,
                            }))
                        }
                        type="date"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="endDate" className="px-2">
                        End Date
                    </label>
                    <input
                        value={projectData.endDate?.slice(0, 10)}
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                endDate: e.target.value,
                            }))
                        }
                        type="date"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="px-2">
                        Project Status
                    </label>
                    <input
                        value={projectData.status}
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                status: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="Provide project status"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="px-2">
                        Project Budget
                    </label>
                    <input
                        value={projectData.budget}
                        onChange={(e) =>
                            setProjectData((prev) => ({
                                ...prev,
                                budget: e.target.value,
                            }))
                        }
                        type="number"
                        placeholder="Provide project budget"
                        className="px-4 py-1.5 border border-indigo-300 rounded-3xl shadow-md"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-1.5 bg-indigo-700 text-white rounded-3xl flex gap-2 items-center"
                >
                    Submit
                </button>
            </div>
        </main>
    );
}

export default AddOrEditProject;