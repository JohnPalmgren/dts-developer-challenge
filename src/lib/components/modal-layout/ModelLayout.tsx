import React, {useEffect} from "react";
import ModalBackdrop from "@/lib/components/modal-layout/ModalBackdrop";
import styles from "./modalLayout.module.css"

const ModalLayout = ({children, hidden}: { children: React.ReactNode, hidden: boolean }) => {

    const [hideModal, setHideModal] = React.useState(hidden);

    // Update hidden status when prop changes from parent component
    useEffect(() => {
        setHideModal(hidden);
    }, [hidden]);

    return (
        <div className={hideModal ? styles.hide : styles.show}>
            <ModalBackdrop onClick={() => setHideModal(true)}>
                <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </ModalBackdrop>
        </div>
    );
}

export default ModalLayout;