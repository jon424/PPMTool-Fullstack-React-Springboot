import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProject, createProject } from "../../actions/projectActions";
import classNames from "classnames";

const UpdateProject = (props) => {
  //   console.log(props.project);
  let navigate = useNavigate();
  const { id } = useParams();

  const [projectName, setProjectName] = useState(props.project.projectName);
  const [projectIdentifier, setProjectIdentifier] = useState(
    props.project.projectIdentifier
  );
  const [description, setDescription] = useState(props.project.description);
  const [startDate, setStartDate] = useState(props.project.startDate);
  const [endDate, setEndDate] = useState(props.project.endDate);
  const [errors, setErrors] = useState(props.errors);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
      console.log("props.errors in AddProj: ", props.errors);
    }
  }, [props.errors]);

  useEffect(() => {
    props.onGetProject(id, navigate);
  }, [id, navigate]);

  const onSubmit = (e) => {
    if (props.errors) {
      setErrors(props.errors);
      console.log("props.errors onSubmit: ", props.errors);
    }
    e.preventDefault();
    const updateProject = {
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      startDate: startDate,
      endDate: endDate,
      errors: props.errors,
    };

    // console.log("updateProject in onSubmit: ", updateProject);
    props.onCreateProject(updateProject, navigate);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project</h5>
            <hr />
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  defaultValue={props.project.projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  defaultValue={props.project.projectIdentifier}
                  onChange={(e) => setProjectIdentifier(e.target.value)}
                  //   disabled
                />
                {errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className={classNames("form-control form-control-lg ", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  defaultValue={props.project.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  defaultValue={props.project.startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  defaultValue={props.project.endDate}
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
