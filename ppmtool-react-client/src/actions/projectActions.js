import axios from "axios";
import { useNavigate } from "react-router";
import { GET_ERRORS, GET_PROJECTS } from "./types";

//we wire up some methods ... useNavigate (react router v6) allows you to redirect once we submit form
export const createProject = (project, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);
    navigate("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/api/project/all");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
    // navigate("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
