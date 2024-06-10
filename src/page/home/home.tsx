import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Task } from "../../model/TaskModel";
import {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
} from "../../service/TaskService";
import TaskCard from "../../components/TaskCard";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import TaskDetailsModal from "../../components/TaskDetailsModal";
import "../../style/home.css";

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
          <h1 className="text-center mb-4">To-Do List</h1>
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
                          <TaskCard
                            task={task}
                            index={index}
                            handleToggleComplete={() =>
                              handleToggleComplete(tasks.indexOf(task))
                            }
                            handleEditTask={() =>
                              handleEditTask(tasks.indexOf(task))
                            }
                            handleDeleteTask={() =>
                              handleDeleteTask(tasks.indexOf(task))
                            }
                            handleCardClick={() => handleCardClick(index)}
                          />
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
      <AddTaskModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        taskTitle={taskTitle}
        taskContent={taskContent}
        dueDate={dueDate}
        setTaskTitle={setTaskTitle}
        setTaskContent={setTaskContent}
        setDueDate={setDueDate}
        handleAddTask={handleAddTask}
      />

      <EditTaskModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        editTaskTitle={editTaskTitle}
        editTaskContent={editTaskContent}
        editTaskDueDate={editTaskDueDate}
        setEditTaskTitle={setEditTaskTitle}
        setEditTaskContent={setEditTaskContent}
        setEditTaskDueDate={setEditTaskDueDate}
        handleSaveEditTask={handleSaveEditTask}
      />

      <TaskDetailsModal
        show={showTaskModal}
        handleClose={() => setShowTaskModal(false)}
        selectedTask={selectedTask}
      />
    </Container>
  );
};

export default MainContent;
