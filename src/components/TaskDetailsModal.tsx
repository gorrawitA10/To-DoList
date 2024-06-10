import React from "react";
import { Modal } from "react-bootstrap";
import { Task } from "../model/TaskModel";

interface TaskDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  selectedTask: Task | null;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  show,
  handleClose,
  selectedTask,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        {selectedTask && (
          <>
            <h5>{selectedTask.title}</h5>
            <p style={{ overflowWrap: "break-word" }}>{selectedTask.content}</p>
            <p>Due Date: {selectedTask.dueDate}</p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TaskDetailsModal;
