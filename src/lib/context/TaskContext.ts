"use client";
import { useContext, createContext, Dispatch } from 'react';
import { State, Action, Task, TaskInput } from '@/lib/types';
import { initialState } from '@/lib/context/taskReducer';

interface TaskContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    fetchTasks: () => Promise<void>;
    addTask: (task: TaskInput) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    removeTask: (id: Task['id']) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps>({
    state: initialState,
    dispatch: () => null, // Placeholder for dispatch function
    fetchTasks: async () => {},
    addTask: async (task) => {},
    updateTask: async (task) => {},
    removeTask: async (id) => {},
});

const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}

export {
    TaskContext,
    useTaskContext,
}