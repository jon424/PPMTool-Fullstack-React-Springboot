import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router";
import { getProject, createProject } from "../../actions/projectActions";
import classNames from "classnames";

const UpdateProject = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  const { id } = useParams();

  const projectDetails = location.state.project;

  const [state, setState] = useState({
    id,
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
    errors: {},
  });

  let project = props.project;
  let errors = props.errors;
  useEffect(() => {
    setState({
      ...projectDetails,
      errors: errors,
    });
  }, [project, errors]);

  useEffect(() => {
    if (props.errors) {
      setState({ ...state, errors: props.errors });
    }
  }, [props.errors]);

  let onGetProject = props.onGetProject;
  useEffect(() => {
    onGetProject(id, navigate);
  }, []);

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
    if (props.errors) {
      //   e.preventDefault();
      //   props.onGetProject(id, navigate);
      //   navigate(location);
    }

    const updateProject = {
      ...state,
    };
    setState({ ...updateProject });

    console.log("onSubmit state: ", state);
    props.onCreateProject(updateProject, navigate);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": props.errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  defaultValue={projectDetails.projectName}
                  onChange={onChange}
                />
                {props.errors.projectName && (
                  <div className="invalid-feedback">
                    {props.errors.projectName}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": props.errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  defaultValue={projectDetails.projectIdentifier}
                  onChange={onChange}
                  //   disabled
                />
                {props.errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {props.errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": props.errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  defaultValue={projectDetails.description}
                  onChange={onChange}
                ></textarea>
                {props.errors.description && (
                  <div className="invalid-feedback">
                    {props.errors.description}
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
                  defaultValue={projectDetails.start_date}
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
                  defaultValue={projectDetails.end_date}
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

UpdateProject.propTypes = {
  onGetProject: PropTypes.func.isRequired,
  onCreateProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, (dispatch) => ({
  onGetProject: (props, history) => dispatch(getProject(props, history)),
  onCreateProject: (props, history) => dispatch(createProject(props, history)),
}))(UpdateProject);
