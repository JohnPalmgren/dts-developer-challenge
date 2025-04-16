"use client";
import React, {useState} from "react";
import EditTaskModal from "@/lib/components/edit-task-modal/EditTaskModal";
import styles from "@/lib/components/all-tasks/allTasks.module.css";
import {Task} from "@/lib/types";
import {useTaskContext} from "@/lib/context/TaskContext";
import {formatDateForDisplay} from "@/lib/utils"
import Image from "next/image";
import binIcon from "../../../assets/bin.png";
import pencilIcon from "../../../assets/pencil.png"

const AllTasks = () => {

    const [hideModal, setHideModal] = useState(true);
    const [targetTask, setTargetTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        completed: false,
        dueDate: new Date()
    })

    const {state, updateTask} = useTaskContext();
    const {tasks, error} = state;

    const checkBoxHandler = async (e: React.ChangeEvent<HTMLInputElement>, task: Task) => {
        const updatedTask = {...task, completed: e.target.checked};
        await updateTask(updatedTask);
    }

    const editTaskHandler = (task: Task) => {
        setTargetTask(task);
        setHideModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <EditTaskModal task={targetTask} hidden={hideModal} setHideModal={setHideModal}/>
            <h1>All Tasks</h1>
            <ul className={styles.list}>
                {tasks.map((task: Task) => (
                    <li key={task.id} className={styles.task}>
                        <div className={styles.listWrapper}>
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
                            <div>
                                <h2>{task.title}</h2>
                                <p>{task.description}</p>
                                <p>Due: {formatDateForDisplay(task.dueDate)}</p>
                            </div>
                            <div className={styles.buttonsWrapper}>
                                <button className={styles.editButton} onClick={editTaskHandler.bind(null, task)}>
                                    <Image src={pencilIcon} alt="edit" width={20} height={20}/>
                                </button>
                                <button className={styles.deleteButton}>
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