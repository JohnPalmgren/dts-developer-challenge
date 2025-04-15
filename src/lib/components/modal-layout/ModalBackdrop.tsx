import React from "react";
import styles from "./modalBackdrop.module.css"

const ModalBackdrop = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.backdrop}>
            {children}
        </div>
    );
}

export default ModalBackdrop;