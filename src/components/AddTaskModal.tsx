import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/datepicker-custom.css";

interface AddTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskTitle: string;
  taskContent: string;
  dueDate: Date;
  setTaskTitle: (title: string) => void;
  setTaskContent: (content: string) => void;
  setDueDate: (date: Date) => void;
  handleAddTask: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  show,
  handleClose,
  taskTitle,
  taskContent,
  dueDate,
  setTaskTitle,
  setTaskContent,
  setDueDate,
  handleAddTask,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTaskTitle">
            <Form.Label className="sr-only">
              Title <span className="validate-star">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="task-input"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTaskContent" className="mt-3">
            <Form.Label className="sr-only">
              Description <span className="validate-star">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task Description"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              className="task-input"
            />
          </Form.Group>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="formDueDate">
                <Form.Label className="mb-1">
                  Due <span className="validate-star">*</span>
                </Form.Label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date: Date) => setDueDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="minimal-datepicker"
                  minDate={new Date()}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="success"
            onClick={handleAddTask}
            className="mt-3 add-task-button w-100"
          >
            Add Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
