import axios from 'axios'

export const setTheme = (bool) => {
  return { type: "SET_THEME", payload: bool };
};

export const toggleMenu = (bool) => {
  return { type: "TOGGLE_MENU", payload: bool };
};

export const setData = (string) => {
  return { type: "SET_DATA", payload: string };
};

export const togglePreview = (bool) => {
  return { type: "TOGGLE_PREVIEW", payload: bool };
};

export const setFileName = (string) => {
  return { type: "FILE_NAME", payload: string };
};

export const getLocalData = () => {
  const data = localStorage.getItem("localData");

  if (!data) {
    localStorage.setItem("localData", JSON.stringify({ user: "", docs: {} }));
    return { type: "LOCAL_DATA", payload: { user: "", docs: {} } };
  }

  return { type: "LOCAL_DATA", payload: JSON.parse(data) };
};

export const updateLocalData = (data) => {
  localStorage.setItem("localData", JSON.stringify(data));

  return { type: "LOCAL_DATA", payload: data };
};

export const setAlert = (alertState) => {
  if (alertState.open === false) {
    return { type: "ALERT_STATUS", payload: false };
  }

  return { type: "ALERT_STATUS", payload: alertState };
};

export const setButtonStatus = (obj) => {
  return { type: 'CHANGE_BUTTONS', payload: obj }
}

export const getData = () => async (dispatch) => {
  const response = await axios.get('/api/get-data')
  
  return dispatch({ type: 'DB_DATA', payload: response.data })
  
}