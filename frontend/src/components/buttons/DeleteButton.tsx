
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal.tsx";
import {useState} from "react";

interface DeleteButtonProps {
    onDelete: () => void;
    isLoading: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, isLoading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="card-delete-button">
            <button onClick={handleModalOpen}>
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            {isModalOpen && (
                <DeleteConfirmationModal
                    onClose={handleModalClose}
                    onDelete={() => {
                        onDelete();
                        handleModalClose();
                    }}
                />
            )}
        </div>
    );
};

export default DeleteButton;
