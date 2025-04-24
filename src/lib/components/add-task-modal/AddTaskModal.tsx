import React from "react";
import styles from "./addTaskModal.module.css"
import {TaskInput} from "@/lib/types";
import ModalLayout from "@/lib/components/modal-layout/ModelLayout";
import {useTaskContext} from "@/lib/context/TaskContext";

const AddTaskModal = ({hidden, setHideModal}: { hidden: boolean, setHideModal: (hidden: boolean) => void }) => {

    const {addTask} = useTaskContext();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string || undefined;
        const dueDate = formData.get("dueDate") as string;

        let newTask: TaskInput;

        if (!description) {
            newTask = {
                title,
                completed: false, // new tasks are not completed by default
                dueDate: new Date(dueDate),
            }
        } else {
            newTask = {
                title,
                description,
                completed: false, // new tasks are not completed by default
                dueDate: new Date(dueDate),
            }
        }
        await addTask(newTask)
        form.reset()
        setHideModal(true);
    }

    return (
        <ModalLayout hidden={hidden} setHideModal={setHideModal}>
            <h1 className={styles.heading}>Add Task</h1>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.formItem}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                        />

                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            required
                        />
                    </div>
                    <div className={styles.buttonsWrapper}>
                        <button type="submit" className="primaryButton">Save Changes</button>
                        <button type="button" className="secondaryButton" onClick={() => setHideModal(true)}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </ModalLayout>
    );
}

export default AddTaskModal;