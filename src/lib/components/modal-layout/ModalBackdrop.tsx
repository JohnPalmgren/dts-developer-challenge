import React from "react";
import styles from "./modalBackdrop.module.css"

const ModalBackdrop = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
    return (
        <div className={styles.backdrop} onClick={onClick}>
            {children}
        </div>
    );
}

export default ModalBackdrop;