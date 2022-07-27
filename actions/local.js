//Functions handling localStorage doc CRUD actions

/**
 * 
 * @param {object} data - Data object consisting of markdown and a new file name
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error on existing file name or sets new doc to localStorage/redux state
 */
export const createLocalDoc = async (data, dispatch, getState) => {
  const { fileName, md } = data;
  const localDocs = getState().localData;
  const dbDocs = getState().dbData.docs;

  if (localDocs.docs[fileName] || dbDocs[fileName]) {
    throw new Error("File already exists!");
  }

  localDocs.docs[fileName] = {
    date: new Date().toLocaleDateString(),
    md: md
  };

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
};

/**
 * 
 * @param {object} data - Data object consisting of markdown and a new file name
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Saves updated doc to localStorage, updates unsaved changes to false
 */
export const saveLocalDoc = async (data, dispatch, getState) => {
  const { fileName, md } = data;
  const localDocs = getState().localData;

  localDocs.docs[fileName].md = md;

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
  dispatch({ type: 'UNSAVED_CHANGES', payload: false })
};

/**
 * 
 * @param {object} data - Data object consisting of file name to be deleted
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error on non-existing file or deletes file from localStorage/redux state
 */
export const deleteLocalDoc = async (data, dispatch, getState) => {
  const localDocs = getState().localData;

  if (!localDocs.docs[data]) {
    throw new Error("File does not exist!");
  }

  delete localDocs.docs[data];

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
};

/**
 * 
 * @param {object} data - Data object consisting of old and new file name, to rename the doc
 * @param {function} dispatch - Redux Thunk dispatch()
 * @param {function} getState - Redux Thunk getState()
 * @returns - Throws error on existing file name or sets new doc name to localStorage/redux state
 */
export const renameLocalDoc = async (data, dispatch, getState) => {
  const { oldFN, newFN } = data;
  const localDocs = getState().localData;
  const dbDocs = getState().dbData.docs;

  if (localDocs.docs[newFN] || dbDocs[newFN]) {
    throw new Error("File name already exists!");
  }

  const newDoc = { ...localDocs.docs[oldFN] };

  delete localDocs.docs[oldFN];
  localDocs.docs[newFN] = newDoc;

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
};
