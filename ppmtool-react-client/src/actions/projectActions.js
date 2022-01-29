import axios from "axios";
import { useNavigate } from "react-router";
import { GET_ERRORS } from "./types";

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
