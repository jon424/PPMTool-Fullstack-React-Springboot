import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { deleteProject } from "../../actions/projectActions";

const ProjectItem = (props) => {
  let navigate = useNavigate();
  //props.project.id is the id you want to delete!
  const onClick = () => {
    // console.log("onClick id: ", id);
    console.log("props.project.id: ", props.project.id);
    props.onDeleteProject(props.project.projectIdentifier, navigate);
    // deleteProject();
  };

  // let onDeleteProject = props.onDeleteProject;
  // // console.log("onDeleteProject: ", onDeleteProject);
  // let projectId = props.project.id;
  // console.log("projectId: ", projectId);
  // onDeleteProject = (id) => {
  //   console.log("id: ", id);
  //   console.log("props onDelete: ", props.project);
  //   deleteProject(id);
  // };
  const { project } = props;

  // const linkTarget = {
  //   pathname: `/updateProject/${project.projectIdentifier}`,
  //   key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
  //   state: {
  //     applied: true,
  //   },
  // };

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{project.projectIdentifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <Link to="">
                <li className="list-group-item board">
                  <i className="fa fa-flag-checkered pr-1">Project Board </i>
                </li>
              </Link>
              <Link
                to={`/updateProject/${project.projectIdentifier}`}
                state={{ ...props }}
                // onClick={() => window.location.pathname}
              >
                <li className="list-group-item update">
                  <i className="fa fa-edit pr-1">Update Project Info</i>
                </li>
              </Link>
              {/* <Link
              // to={`/deleteProject/${project.projectIdentifier}`}
              // state={{ ...props }}
              // onClick={props.onDeleteProject}
              > */}
              <li className="list-group-item delete" onClick={onClick}>
                <i className="fa fa-minus-circle pr-1">Delete Project</i>
              </li>
              {/* </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  onDeleteProject: PropTypes.func.isRequired,
  // deleteProject: PropTypes.func.isRequired,
  // project: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   project: state.project.project,
//   errors: state.errors,
// });

// export default connect(null, (dispatch) => ({
//   onDeleteProject: (props, history) => dispatch(deleteProject(props, history)),
// }))(ProjectItem);

export default connect(null, (dispatch) => ({
  onDeleteProject: (props) => dispatch(deleteProject(props)),
}))(ProjectItem);

// export default connect(null, { deleteProject }(ProjectItem));
// export default ProjectItem;
