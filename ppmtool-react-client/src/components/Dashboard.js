import React, { useEffect } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

const Dashboard = (props) => {
  useEffect(() => {
    props.onGetProjects();
  }, [props]);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            <ProjectItem />
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  onGetProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, (dispatch) => ({
  onGetProjects: () => dispatch(getProjects()),
}))(Dashboard);
