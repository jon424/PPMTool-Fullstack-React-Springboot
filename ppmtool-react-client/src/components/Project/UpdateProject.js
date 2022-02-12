import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProject, createProject } from "../../actions/projectActions";
import classNames from "classnames";

const UpdateProject = (props) => {
  console.log(props.project);
  let navigate = useNavigate();
  const { id } = useParams();
  //   const [state, setState] = useState({
  //     id,
  //     projectName: props.project.projectName,
  //     projectIdentifier: props.project.projectIdentifier,
  //     description: props.project.description,
  //     startDate: props.project.startDate,
  //     endDate: props.projectendDate,
  //   });
  const [state, setState] = useState({
    id,
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(
    (state) => {
      setState({
        ...state,
        id: props.project.id,
        projectName: props.project.projectName,
        projectIdentifier: props.project.projectIdentifier,
        description: props.project.description,
        startDate: props.project.startDate,
        endDate: props.project.endDate,
      });
    },
    [props.project]
  );

  useEffect(() => {
    if (props.errors) {
      //   setErrors(props.errors);
    }

    props.onGetProject(id, navigate);
  }, [id, navigate]);

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    // console.log("state in onChange(): ", state);
  };

  //   console.log("state before onSubmit(): ", state);

  const onSubmit = (e) => {
    e.preventDefault();
    const updateProject = {
      ...state,
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
                  //   className={classNames("form-control form-control-lg ", {
                  //     "is-invalid": errors.projectName,
                  //   })}
                  placeholder="Project Name"
                  name="projectName"
                  defaultValue={state.projectName}
                  onChange={onChange}
                />
                {/* {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )} */}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  //   className={classNames("form-control form-control-lg ", {
                  //     "is-invalid": errors.projectIdentifier,
                  //   })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  defaultValue={state.projectIdentifier}
                  onChange={onChange}
                  disabled
                />
                {/* {errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {errors.projectIdentifier}
                  </div>
                )} */}
              </div>
              <div className="form-group">
                <textarea
                  //   className={classNames("form-control form-control-lg ", {
                  //     "is-invalid": errors.description,
                  //   })}
                  placeholder="Project Description"
                  name="description"
                  defaultValue={state.description}
                  onChange={onChange}
                ></textarea>
                {/* {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )} */}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  defaultValue={state.startDate}
                  onChange={onChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
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
