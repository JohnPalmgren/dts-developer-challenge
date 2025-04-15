"use client";
import styles from "./page.module.css";
import { Task } from "@/lib/types";
import { useTaskContext } from "@/lib/context/TaskContext";
import { formatDate } from "@/lib/utils"
import Image from "next/image";
import binIcon from "../assets/bin.png";
import pencilIcon from "../assets/pencil.png";


// TODO create logic in component and import
export default function Home() {

    const { state, fetchTasks, addTask, updateTask, removeTask } = useTaskContext();
    const {tasks, error} = state;

    return (
        <div className={styles.wrapper}>
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
                                />
                            </div>
                            <div>
                                <h2>{task.title}</h2>
                                <p>{task.description}</p>
                                <p>Due: {formatDate(task.dueDate)}</p>
                            </div>
                            <div className={styles.buttonsWrapper}>
                                <button className={styles.editButton}>
                                    <Image src={pencilIcon} alt="edit" width={20} height={20} />
                                </button>
                                <button className={styles.deleteButton}>
                                    <Image src={binIcon} alt="delete" width={20} height={20} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
