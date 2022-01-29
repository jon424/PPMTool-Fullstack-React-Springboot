import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";

const AddProject = (props) => {
  // "projectName": "UPDATED NAME!!!!!",
  // "projectIdentifier": "ID20",
  // "description": "description dawg234",
  // "start_date": null,
  // "end_date": null,
  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);

  const onSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      startDate: startDate,
      endDate: endDate,
      errors: {},
    };
    // createProject(newProject, props.history);
    // createProject(newProject, props.history);
    props.onCreateProject(newProject, props.history);

    console.log("newProject: ", newProject);
    console.log("props.history: ", props.history);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  onChange={(e) => setProjectIdentifier(e.target.value)}
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({ errors: state.errors });
export default connect(null, (dispatch) => ({
  onCreateProject: (props, history) => dispatch(createProject(props, history)),
}))(AddProject);

// export default connect(null, { createProject })(AddProject);
