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

export const getLocalData = (props) => {
  const data = localStorage.getItem("localData");
  console.log(props);
  if (!data) {
    localStorage.setItem("localData", JSON.stringify({ user: "", docs: {} }));
    return { type: "LOCAL_DATA", payload: { user: "", docs: {} } };
  }

  return { type: "LOCAL_DATA", payload: JSON.parse(data) };
};
