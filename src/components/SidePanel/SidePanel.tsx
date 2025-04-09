import styles from './SidePanel.module.css';

export default function SidePanel () {
    return(
        <>
            <div className={styles.panel}>
                {
                    // user - shows logged-in user
                    // add task * - modal to add task
                    // view all tasks * - page with all tasks, filtering etc.
                    // today's tasks - shows tasks due today
                    // bin - show soft deleted tasks
                }
            </div>
            <div className={styles.spacer}></div>
        </>
    )
}