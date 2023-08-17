import './../../styles/styles.css'

interface DeleteConfirmationModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
                                                                             onClose,
                                                                             onDelete,
                                                                         }) => {
    return (
        <div className="modal-overlay">
            <div className="delete-confirmation-modal">
                <p>Are you sure you want to delete this event?</p>
                <button className="delete-yes" onClick={onDelete}>
                    Yes
                </button>
                <button className="delete-no" onClick={onClose}>
                    No
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
