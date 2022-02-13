import axios from "axios";
import { useNavigate } from "react-router";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";

//we wire up some methods ... useNavigate (react router v6) allows you to redirect once we submit form
export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    navigate("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    console.log("err from actions: ", err);
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

//gets history, because if there are any errors, we redirect to /dashboard
export const getProject = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({ type: GET_PROJECT, payload: res.data });
  } catch (err) {
    navigate("/dashboard");
  }
};
