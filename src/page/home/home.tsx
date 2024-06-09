import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Nav,
} from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pencil, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Task } from "../../model/TaskModel";
import {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
} from "../../service/TaskService";
import "./home.css";

const MainContent: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskContent, setTaskContent] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState<string>("");
  const [editTaskContent, setEditTaskContent] = useState<string>("");
  const [editTaskDueDate, setEditTaskDueDate] = useState<Date>(new Date());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [incompleteTasksCount, setIncompleteTasksCount] = useState<number>(0);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const tasksFromLocalStorage = getTasksFromLocalStorage();
    if (tasksFromLocalStorage) {
      setTasks(tasksFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const count = tasks.filter((task) => !task.completed).length;
    setIncompleteTasksCount(count);
  }, [tasks]);

  const handleAddTask = () => {
    if (validateTask()) {
      const newTask: Task = {
        title: taskTitle,
        content: taskContent,
        date: new Date().toLocaleString(),
        dueDate: dueDate.toLocaleDateString(),
        completed: false,
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
      setTaskTitle("");
      setTaskContent("");
      setShowAddModal(false);
    }
  };

  const handleDeleteTask = (index: number) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want delete item !!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " #d33",
      confirmButtonText: "Yes",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        saveTasksToLocalStorage(newTasks);
        MySwal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const handleEditTask = (index: number) => {
    setEditTaskIndex(index);
    setEditTaskTitle(tasks[index].title);
    setEditTaskContent(tasks[index].content);
    setEditTaskDueDate(new Date(tasks[index].dueDate));
    setShowEditModal(true);
  };

  const handleSaveEditTask = () => {
    if (editTaskIndex !== null) {
      if (!editTaskTitle.trim()) {
        MySwal.fire({
          icon: "error",
          title: "Sorry",
          text: "Please enter a task title!",
        });
        return;
      }
      if (!editTaskContent.trim()) {
        MySwal.fire({
          icon: "error",
          title: "Sorry",
          text: "Please enter task description!",
        });
        return;
      }

      const newTasks = tasks.map((task, index) => {
        if (index === editTaskIndex) {
          return {
            ...task,
            title: editTaskTitle,
            content: editTaskContent,
            dueDate: editTaskDueDate.toLocaleDateString(),
          };
        }
        return task;
      });
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
      setShowEditModal(false);
    }
  };

  const handleToggleComplete = (index: number) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "not_completed") return !task.completed;
    return true;
  });

  const handleCardClick = (index: number) => {
    setSelectedTask(filteredTasks[index]);
    setShowTaskModal(true);
  };
  const validateTask = () => {
    if (!taskTitle.trim()) {
      MySwal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please enter a task title!",
      });
      return false;
    }
    if (!taskContent.trim()) {
      MySwal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please enter task description!",
      });
      return false;
    }
    return true;
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h1 className="text-center mb-4">To - Do List</h1>
          <Nav variant="tabs" defaultActiveKey="all">
            <Nav.Item>
              <Nav.Link eventKey="all" onClick={() => setFilter("all")}>
                All work
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="completed"
                onClick={() => setFilter("completed")}
              >
                Completed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="not_completed"
                onClick={() => setFilter("not_completed")}
              >
                Not Completed
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="d-flex justify-content-between mb-3 mt-3">
            <div className="ml-3">
              Do you have {incompleteTasksCount} task left
            </div>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Add Task
            </Button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="task-container"
                >
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                      isDragDisabled={false}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="mb-3">
                            <Card.Body>
                              <div className="d-flex align-items-center gap-buttom ">
                                <input
                                  type="checkbox"
                                  className="custom-checkbox mr-3"
                                  checked={task.completed}
                                  onChange={() => handleToggleComplete(index)}
                                />
                                <Card.Title
                                  className={`task-title mr-2 ${
                                    task.completed ? "completed" : ""
                                  }`}
                                >
                                  {task.title}
                                </Card.Title>
                              </div>
                              <div onClick={() => handleCardClick(index)}>
                                <Card.Text className="task-content">
                                  {task.content.length > 200
                                    ? task.content.substring(0, 200) + "..."
                                    : task.content}
                                </Card.Text>
                                <Card.Text>
                                  <br />
                                  <small className="text-muted">
                                    Due: {task.dueDate}
                                  </small>
                                  <br />
                                </Card.Text>
                              </div>

                              <div className="d-flex align-items-center justify-content-end gap-buttom">
                                <Button
                                  variant="secondary"
                                  className="mr-2"
                                  onClick={() => handleEditTask(index)}
                                >
                                  <Pencil />
                                  <span className="ml-1">Edit</span>
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDeleteTask(index)}
                                >
                                  <Trash />
                                  <span className="ml-1">Delete</span>
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>

      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        className="position-e"
      >
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
                    className="form-control date-picker"
                    minDate={new Date()}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              onClick={handleAddTask}
              className="mt-3 add-task-button w-100"
            >
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
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
          <Button variant="success" onClick={handleSaveEditTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          {selectedTask && (
            <>
              <h5>{selectedTask.title}</h5>
              <p style={{ overflowWrap: "break-word" }}>
                {selectedTask.content}
              </p>
              <p>Due Date: {selectedTask.dueDate}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MainContent;
