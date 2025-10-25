const projects = require("../models/projectModel");

exports.addProject = async (req, res) => {
  try {
    const {
      projectName,
      projectManager,
      teamMembers,
      startDate,
      endDate,
      status,
      budget,
    } = req.body;
    if (
      !projectName ||
      !projectManager ||
      !teamMembers ||
      !startDate ||
      !endDate ||
      !status ||
      !budget
    )
      return res.status(400).json({
        message: "All Fields are required. Please provide all fields",
      });

    const newProject = await projects.create({
      projectName,
      projectManager,
      teamMembers,
      startDate,
      endDate,
      status,
      budget,
    });
    console.log("new created project : ", newProject);
    if (!newProject)
      return res
        .status(400)
        .json({ message: "failed to Add new Project. please try again" });
    res
      .status(201)
      .json({ message: "Project added Successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, Check your server" });
  }
};

exports.editProject = async (req, res) => {
  try {
    const {
      projectName,
      projectManager,
      teamMembers,
      startDate,
      endDate,
      status,
      budget,
    } = req.body;
    const { projectId } = req.params;
    console.log("params recieved in editProject", req.params);

    if (
      !projectName ||
      !projectManager ||
      !teamMembers ||
      !startDate ||
      !endDate ||
      !status ||
      !budget
    )
      return res.status(400).json({
        message: "All Fields are required. Please provide all fields",
      });

    if (!projectId)
      return res.status(400).json({ message: "Please Provide projectId" });

    const exisitingProject = await projects.findById(projectId);
    if (!exisitingProject)
      return res
        .status(400)
        .json({ message: "Project Not found . Check your Project Id" });

    const updatedProject = await projects.findByIdAndUpdate(
      {
        projectName,
        projectManager,
        teamMembers,
        startDate,
        endDate,
        status,
        budget,
      },
      { new: true }
    );

    console.log("new updated project : ", updatedProject);

    res
      .status(201)
      .json({ message: "Project added Successfully", project: updatedProject });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, Check your server" });
  }
};

exports.getAllprojects = async (req, res) => {
  try {
    const Allprojects = await projects.find();

    if (!Allprojects)
      return res.status(400).json({ message: "All projects not found" });
    res.status(200).json({
      message: "Retrieved All Projects successfully",
      project: Allprojects,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, Check your server" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("params recieved in editProject", req.params);

    if (!projectId)
      return res.status(400).json({ message: "Please Provide projectId" });

    const deletedProject = await projects.findByIdAndDelete(projectId, {
      new: true,
    });

    res.status(200).json({
      message: "Deleted Project successfully",
      project: deletedProject,
    });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to Delete the project", error : error });
  }
};
