"use client";
import React, {
    useReducer,
    useEffect,
    useCallback,
    useMemo,
    ReactNode
} from "react";
import { TaskContext } from "@/lib/context/TaskContext";
import { taskReducer, initialState } from "@/lib/context/taskReducer";
import { Task, RawTask, ActionTypes } from "@/lib/types";

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }: TaskProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await fetch("/api/tasks");
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data: RawTask[] = await response.json();
            // Convert date string to Date object.
            const tasksWithDates: Task[] = data.map((task: RawTask) => ({
                ...task,
                dueDate: new Date(task.dueDate),
            }));
            dispatch({ type: ActionTypes.SET_TASKS, payload: tasksWithDates });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: "error in taskProvider.fetchTasks" });
            }
        }
    }, []);

    const addTask = useCallback(async (task: Task) => {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
            const data: RawTask = await response.json();
            // Convert date string to Date object.
            const taskWithDate: Task = {
                ...data,
                dueDate: new Date(data.dueDate),
            };
            dispatch({ type: ActionTypes.ADD_TASK, payload: taskWithDate });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: "error in taskProvider.addTask" });
            }
        }
    }, [])

    const updateTask = useCallback(async (task: Task) => {
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            const data: RawTask = await response.json();
            // Convert date string to Date object.
            const taskWithDate: Task = {
                ...data,
                dueDate: new Date(data.dueDate),
            };
            dispatch({ type: ActionTypes.UPDATE_TASK, payload: taskWithDate });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: "error in taskProvider.updateTask" });
            }
        }
    }, [])

    const removeTask = useCallback(async (id: Task["id"]) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            dispatch({ type: ActionTypes.REMOVE_TASK, payload: id });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
            } else {
                dispatch({ type: ActionTypes.SET_ERROR, payload: "error in taskProvider.removeTask" });
            }
        }
    }, [])

    // Fetch initial data on mount
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);


    // useMemo prevents unnecessary re-renders of consumers if the Provider itself re-renders
    // but the state and functions haven't actually changed.
    const contextValue = useMemo(() => ({
        state,
        dispatch,
        fetchTasks,
        addTask,
        updateTask,
        removeTask,
    }), [state, dispatch, fetchTasks, addTask, updateTask, removeTask]); // Add all provided functions

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;



