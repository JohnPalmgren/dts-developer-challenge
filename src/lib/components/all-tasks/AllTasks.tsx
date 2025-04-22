"use client";
import React, {useEffect, useState} from "react";
import EditTaskModal from "@/lib/components/edit-task-modal/EditTaskModal";
import DeleteTaskModal from "@/lib/components/delete-task-modal/DeleteTaskModal";
import styles from "@/lib/components/all-tasks/allTasks.module.css";
import {Task} from "@/lib/types";
import {useTaskContext} from "@/lib/context/TaskContext";
import {formatDateForDisplay} from "@/lib/utils"
import Image from "next/image";
import binIcon from "../../../assets/bin.png";
import pencilIcon from "../../../assets/pencil.png"

const AllTasks = () => {

    const [hideEditModal, setHideEditModal] = useState(true);
    const [hideDeleteModal, setHideDeleteModal] = useState(true);
    const [targetTask, setTargetTask] = useState<Task>({
        id: -1,
        title: "",
        description: "",
        completed: false,
        dueDate: new Date()
    })

    const {state, updateTask} = useTaskContext();
    const {tasks, error} = state;

    const orderByCompleted = (tasks: Task[]) => {
        return tasks.sort((a, b) => {
            if (a.completed === b.completed) {
                return 0;
            }
            return a.completed ? 1 : -1;
        });
    }

    const checkBoxHandler = async (e: React.ChangeEvent<HTMLInputElement>, task: Task) => {
        const updatedTask = {...task, completed: e.target.checked};
        await updateTask(updatedTask);
    }

    const editTaskHandler = (task: Task) => {
        setTargetTask(task);
        setHideEditModal(false);
    }

    const deleteTaskHandler = (task: Task) => {
        setTargetTask(task);
        setHideDeleteModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <EditTaskModal task={targetTask} hidden={hideEditModal} setHideModal={setHideEditModal}/>
            <DeleteTaskModal task={targetTask} hidden={hideDeleteModal} setHideModal={setHideDeleteModal}/>
            <h1>All Tasks</h1>
                <ul className={styles.list}>
                    {orderByCompleted(tasks).map((task: Task) => (
                        <li key={task.id} className={styles.task}>
                            <div className={styles.listItemWrapper}>
                                <div>
                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        id={task.id.toString()}
                                        name={task.title}
                                        checked={task.completed}
                                        onChange={(e) => checkBoxHandler(e, task)}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                    <p>{formatDateForDisplay(task.dueDate)}</p>
                                </div>
                                <div className={styles.buttonsWrapper}>
                                    <button className={styles.editButton} onClick={editTaskHandler.bind(null, task)}>
                                        <Image src={pencilIcon} alt="edit" width={20} height={20}/>
                                    </button>
                                    <button className={styles.deleteButton}
                                            onClick={deleteTaskHandler.bind(null, task)}>
                                        <Image src={binIcon} alt="delete" width={20} height={20}/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default AllTasks;