import {
    State,
    Action,
    ActionTypes,
} from "@/lib/types";

const initialState: State = {
    tasks: [],
    error: null,
}

const taskReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.SET_TASKS:
            return { ...state, tasks: action.payload };
        case ActionTypes.ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case ActionTypes.REMOVE_TASK:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case ActionTypes.UPDATE_TASK:
            return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task) };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export {
    initialState,
    taskReducer,
}