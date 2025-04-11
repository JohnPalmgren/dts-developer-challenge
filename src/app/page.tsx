import styles from "./page.module.css";
import { Task } from "@/lib/types";
import { formatDate } from "@/lib/utils"
import Image from "next/image";
import binIcon from "../assets/bin.png";
import pencilIcon from "../assets/pencil.png";

const dummyData: Array<Task> = [
    {
        id: 0,
        title: "task 1",
        description: "description 1",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 1,
        title: "task 2",
        description: "description 2",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 2,
        title: "task 3",
        completed: false,
        dueDate: new Date()
    },
    {
        id: 3,
        title: "task 4",
        completed: true,
        dueDate: new Date()
    },
    {
        id: 4,
        title: "task 5",
        description: "description 5",
        completed: true,
        dueDate: new Date()
    }
]

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <h1>All Tasks</h1>
            <ul className={styles.list}>
                {dummyData.map((task) => (
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
