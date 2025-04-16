import React from "react";
import ModalBackdrop from "@/lib/components/modal-layout/ModalBackdrop";
import styles from "./modalLayout.module.css"

const ModalLayout = ({children, hidden, setHideModal}: { children: React.ReactNode, hidden: boolean, setHideModal: (hidden: boolean) => void }) => {

    return (
        <div className={hidden ? styles.hide : styles.show}>
            <ModalBackdrop onClick={() => setHideModal(true)}>
                <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </ModalBackdrop>
        </div>
    );
}

export default ModalLayout;