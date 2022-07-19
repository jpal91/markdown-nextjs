export const createLocalDoc = (data) => async (dispatch, getState) => {
    const { fileName, md } = data
    const localDocs = getState().localData
    const dbDocs = getState().dbData.docs

    if (localDocs.docs[fileName] || dbDocs[fileName]) {
        throw new Error('File already exists!')
    }

    localDocs.docs[fileName] = {
        date: new Date().toLocaleDateString(),
        md: md
    }

    localStorage.setItem('localData', JSON.stringify(localDocs))

    return dispatch({ type: 'LOCAL_DATA', action: localDocs })
}

// export const saveLocalDoc = (data) => async (dispatch, getState) => {
//     const { fileName, md } = data
//     const localDocs = getState().localData

//     localDocs.docs[fileName].md = md

//     console.log(localDocs)

//     localStorage.setItem('localData', JSON.stringify(localDocs))

//     dispatch({ type: 'LOCAL_DATA', action: localDocs })
// }

export const saveLocalDoc = async (data, dispatch, getState) => {
    const { fileName, md } = data
    const localDocs = getState().localData

    localDocs.docs[fileName].md = md

    
    
    localStorage.setItem('localData', JSON.stringify(localDocs))

    dispatch({ type: 'LOCAL_DATA', action: localDocs })

    return
}

export const deleteLocalDoc = (data) => async (dispatch, getState) => {
    const { fileName } = data
    const localDocs = getState().localData

    if (!localDocs.docs[fileName]) {
        throw new Error('File does not exist!')
    }

    delete localDocs.docs[fileName]

    localStorage.setItem('localData', JSON.stringify(localDocs))

    return dispatch({ type: 'LOCAL_DATA', action: localDocs })
}