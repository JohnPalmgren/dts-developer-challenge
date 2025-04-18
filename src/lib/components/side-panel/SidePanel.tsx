"use client";
import {useState} from 'react';
import Link from 'next/link';
import styles from './sidePanel.module.css';
import AddTaskModal from '../add-task-modal/AddTaskModal';


// user - shows logged-in user
// add task * - modal to add task
// view all tasks * - page with all tasks, filtering etc.
// today's tasks - shows tasks due today
// bin - show soft deleted tasks


export default function SidePanel() {
    const [hideAddModal, setHideAddModal] = useState(true);

    return (
        <>
            <AddTaskModal hidden={hideAddModal} setHideModal={setHideAddModal} />
            <div className={styles.panel}>
                <div className={styles.wrapper}>
                    <button className={styles.addTask} onClick={() => setHideAddModal(false)}>+ Add task</button>
                    <Link href="/">View all tasks</Link>
                </div>
            </div>
            <div className={styles.spacer}></div>
        </>
    )
}