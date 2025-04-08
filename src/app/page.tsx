import styles from "./page.module.css";
import { Task } from "@/types";

const dummyData: Array<Task> = [
    {
        id: 0,
        title: "task 1",
        description: "description 1",
        status: 0,
        dueDate: new Date()
    },
    {
        id: 1,
        title: "task 2",
        description: "description 2",
        status: 0,
        dueDate: new Date()
    },
    {
        id: 2,
        title: "task 3",
        status: 0,
        dueDate: new Date()
    },
    {
        id: 3,
        title: "task 4",
        status: 1,
        dueDate: new Date()
    },
    {
        id: 4,
        title: "task 5",
        description: "description 5",
        status: 1,
        dueDate: new Date()
    }
]

export default function Home() {
    return (
        <div>
            <ul>
                {dummyData.map((task) => (
                    <li key={task.id} className={styles.task}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Due Date: {task.dueDate.toString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
