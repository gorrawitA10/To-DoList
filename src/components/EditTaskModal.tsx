import React from "react";
import { Modal, Form, Button, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  editTaskTitle: string;
  editTaskContent: string;
  editTaskDueDate: Date;
  setEditTaskTitle: (title: string) => void;
  setEditTaskContent: (content: string) => void;
  setEditTaskDueDate: (date: Date) => void;
  handleSaveEditTask: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  show,
  handleClose,
  editTaskTitle,
  editTaskContent,
  editTaskDueDate,
  setEditTaskTitle,
  setEditTaskContent,
  setEditTaskDueDate,
  handleSaveEditTask,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formEditTaskTitle">
          <Form.Label className="sr-only">
            Title<span className="validate-star">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            className="task-input"
          />
        </Form.Group>
        <Form.Group controlId="formEditTaskContent" className="mt-3">
          <Form.Label className="sr-only">
            Description<span className="validate-star">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task content"
            value={editTaskContent}
            onChange={(e) => setEditTaskContent(e.target.value)}
            className="task-input"
          />
        </Form.Group>
        <Form.Group controlId="formEditDueDate" className="mt-3">
          <Row>
            <Form.Label>
              Due <span className="validate-star">*</span>
            </Form.Label>
            <DatePicker
              selected={editTaskDueDate}
              onChange={(date: Date) => setEditTaskDueDate(date)}
              dateFormat="MMMM d, yyyy"
              className="form-control date-picker"
              minDate={new Date()}
            />
          </Row>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={handleSaveEditTask}
          className="btnSS"
        >
          Edit Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
