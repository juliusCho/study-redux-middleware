export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        dispatch({ type, param });
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload });
        } catch (e) {
            dispatch({ type: ERROR, error: e});
        }
    }
}

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    loading(data = null) {
        return {
            loading: true,
            data,
            error: null
        };
    },
    success(data) {
        return {
            loading: false,
            data,
            error: null
        };
    },
    error(error) {
        return {
            loading: false,
            data: null,
            error
        };
    }
}

export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null)
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.error)
                }
            default:
                return state;
        }
    }
};

const defaultIdSelector = param => param;

export const createPromiseThunkById = (
    type,
    promiseCreator,
    idSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        const id = idSelector(param);
        dispatch({ type, meta: id });
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload, meta: id });
        } catch (e) {
            dispatch({ type: ERROR, error: e, meta: id});
        }
    };
};

export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (state, action) => {
        const id = action.meta;

        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.loading(
                            keepData ? state[key][id] && state[key][id].data : null
                        )
                    }
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.success(action.payload)
                    }
                };
            case ERROR:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.error(action.error)
                    }
                };
            default:
                return state;
        }
    };
};