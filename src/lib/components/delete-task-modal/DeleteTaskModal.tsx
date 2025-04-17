import styles from "./deleteTaskModal.module.css"
import {Task} from "@/lib/types";
import ModalLayout from "@/lib/components/modal-layout/ModelLayout";
import {useTaskContext} from "@/lib/context/TaskContext";
import {formatDateForDisplay} from "@/lib/utils";

const EditTaskModal = ({task, hidden, setHideModal}: {
    task: Task,
    hidden: boolean,
    setHideModal: (hidden: boolean) => void
}) => {

    const {removeTask} = useTaskContext();

    const deleteTaskHandler = async () => {
        if (!task.id || task.id < 0) {
            console.error("Invalid task ID");
            return;
        }
        await removeTask(task.id);
        setHideModal(true);
    }

    return (
        <ModalLayout hidden={hidden} setHideModal={setHideModal}>
            <div className={styles.wrapper}>
                <h1 className={styles.heading}>Delete Task</h1>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{formatDateForDisplay(task.dueDate)}</p>
                <div className={styles.buttonWrapper}>
                    <button type="button" className="dangerButton" onClick={deleteTaskHandler}>Delete</button>
                    <button type="button" className="secondaryButton" onClick={() => setHideModal(true)}>Cancel</button>
                </div>
            </div>
        </ModalLayout>
    );
}

export default EditTaskModal;