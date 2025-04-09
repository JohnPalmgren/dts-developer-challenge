import Link from 'next/link';
import styles from './SidePanel.module.css';

// user - shows logged-in user
// add task * - modal to add task
// view all tasks * - page with all tasks, filtering etc.
// today's tasks - shows tasks due today
// bin - show soft deleted tasks

export default function SidePanel () {
    return(
        <>
            <div className={styles.panel}>
                <div className={styles.wrapper}>
                    <button className={styles.addTask}>+ Add task</button>
                    <Link href="/">View all tasks</Link>
                </div>
            </div>
            <div className={styles.spacer}></div>
        </>
    )
}