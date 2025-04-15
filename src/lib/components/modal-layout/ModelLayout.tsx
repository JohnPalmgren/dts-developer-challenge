import React from "react";
import  ModalBackdrop from "@/lib/components/modal-layout/ModalBackdrop";
import styles from "./modalLayout.module.css"

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalBackdrop>
            <div className={styles.modalContent}>
                {children}
            </div>
        </ModalBackdrop>
    );
}

export default ModalLayout;