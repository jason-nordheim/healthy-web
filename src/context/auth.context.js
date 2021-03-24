import { createContext } from "react";
import { loginUser } from "../util/ApiUtils";

/**
 * Default the context to having an undefined token
 */
export const AuthContext = createContext({
  request_in_progress: false,
  token: undefined,
  error: undefined,
});

const ACTIONS = {
  // login Actions
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  // Logout Actions
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  // Register Actions
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
};

export const AuthActions = {
  Login: (user, dispatch) => {
    // request started
    dispatch({ type: ACTIONS.LOGIN_REQUEST, payload: null });
    loginUser(user)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({
            type: ACTIONS.LOGIN_FAILURE,
            payload: { error: data.error },
          });
        }
        console.log("data", data);
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          payload: { token: data.token },
        });
        // todo: handle success
      })
      .catch((error) => {
        console.error("LoginError", error);
        dispatch({
          type: ACTIONS.LOGIN_FAILURE,
          payload: { error },
        });
      });
  },
  Logout: (dispatch) => {
    try {
      dispatch({ type: ACTIONS.LOGOUT_REQUEST });
      dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE });
    }
  },
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        request_in_progress: false,
        token: action.payload.token,
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
    case ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        request_in_progress: false,
        error: undefined,
      };
    case ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
    case ACTIONS.REGISTER_REQUEST:
      break;
    case ACTIONS.REGISTER_SUCCESS:
      break;
    case ACTIONS.REGISTER_FAILURE:
      break;

    default:
      throw new Error("Invalid Action");
  }
};