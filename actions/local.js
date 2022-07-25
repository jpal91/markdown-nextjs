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

export const saveLocalDoc = async (data, dispatch, getState) => {
  const { fileName, md } = data;
  const localDocs = getState().localData;

  localDocs.docs[fileName].md = md;

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
  dispatch({ type: 'UNSAVED_CHANGES', payload: false })
};

export const deleteLocalDoc = async (data, dispatch, getState) => {
  const localDocs = getState().localData;

  if (!localDocs.docs[data]) {
    throw new Error("File does not exist!");
  }

  delete localDocs.docs[data];

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
};

export const renameLocalDoc = async (data, dispatch, getState) => {
  const { oldFN, newFN } = data;
  const localDocs = getState().localData;
  const dbDocs = getState().dbData.docs;

  if (localDocs.docs[newFN] || dbDocs[newFN]) {
    throw new Error("File already exists!");
  }

  const newDoc = { ...localDocs.docs[oldFN] };

  delete localDocs.docs[oldFN];
  localDocs.docs[newFN] = newDoc;

  localStorage.setItem("localData", JSON.stringify(localDocs));

  dispatch({ type: "LOCAL_DATA", payload: localDocs });
};
