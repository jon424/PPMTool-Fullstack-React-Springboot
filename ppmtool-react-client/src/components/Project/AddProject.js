import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { createProject } from "../../actions/projectActions";
import classNames from "classnames";

const AddProject = (props) => {
  let navigate = useNavigate();

  // const [projectName, setProjectName] = useState("");
  // const [projectIdentifier, setProjectIdentifier] = useState("");
  // const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState(Date);
  // const [endDate, setEndDate] = useState(Date);
  // const [errors, setErrors] = useState({});

  const [state, setState] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
    errors: {},
  });

  useEffect(() => {
    if (props.errors) {
      setState({ ...state, errors: props.errors });
      // console.log("props.errors in AddProj: ", props.errors);
    }
  }, [props.errors]);

  const onChange = (e) => {
    let field = e.target.name;
    props.errors[field] = false;
    setState((projectDetails) => ({
      ...projectDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...state,
    };
    props.onCreateProject(newProject, navigate);
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
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": state.errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  value={state.projectName}
                  onChange={onChange}
                />
                {state.errors.projectName && (
                  <div className="invalid-feedback">
                    {state.errors.projectName}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": state.errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={state.projectIdentifier}
                  onChange={onChange}
                />
                {state.errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {state.errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": state.errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  value={state.description}
                  onChange={onChange}
                ></textarea>
                {state.errors.description && (
                  <div className="invalid-feedback">
                    {state.errors.description}
                  </div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  // onFocus={(e) => (e.currentTarget.type = "text")}
                  // onFocus={(e) => (e.currentTarget.type = "date")}
                  onBlur={(e) => (e.currentTarget.type = "date")}
                  name="start_date"
                  placeholder="mm/dd/yyyy"
                  defaultValue={state.startDate}
                  onChange={onChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  // onFocus={(e) => (e.currentTarget.type = "text")}
                  // onFocus={(e) => (e.currentTarget.type = "date")}
                  onBlur={(e) => (e.currentTarget.type = "date")}
                  name="end_date"
                  placeholder="mm/dd/yyyy"
                  defaultValue={state.endDate}
                  onChange={onChange}
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
  onCreateProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, (dispatch) => ({
  onCreateProject: (props, history) => dispatch(createProject(props, history)),
}))(AddProject);
