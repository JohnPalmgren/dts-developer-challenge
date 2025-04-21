import React, {useEffect} from "react";
import styles from "./editTaskModal.module.css"
import { Task } from "@/lib/types";
import ModalLayout from "@/lib/components/modal-layout/ModelLayout";
import {useTaskContext} from "@/lib/context/TaskContext";
import {formatDateToYYYYMMDD} from "@/lib/utils";

// TODO add validation

const EditTaskModal = ({task, hidden, setHideModal}: {task: Task, hidden: boolean, setHideModal: (hidden: boolean) => void}) => {

    const { updateTask } = useTaskContext();

    const [ title, setTitle ] = React.useState(task.title);
    const [ description, setDescription ] = React.useState(task.description);
    const [ dueDate, setDueDate ] = React.useState(task.dueDate);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
    }, [task]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            title,
            description,
            completed: task.completed,
            dueDate: new Date(dueDate)
        }
        await updateTask(updatedTask);
        setHideModal(true);
    }

    return (
        <ModalLayout hidden={hidden} setHideModal={setHideModal}>
            <h1 className={styles.heading}>Edit Task</h1>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.formItem}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formatDateToYYYYMMDD(dueDate)}
                            required
                            onChange={(e) => {setDueDate(new Date(e.target.value))}}
                        />
                    </div>
                    <div className={styles.buttonsWrapper}>
                        <button type="submit" className="primaryButton">Save Changes</button>
                        <button type="button" className="secondaryButton" onClick={() => setHideModal(true)}>Cancel</button>
                    </div>
                </form>
            </div>
        </ModalLayout>
    );
}

export default EditTaskModal;