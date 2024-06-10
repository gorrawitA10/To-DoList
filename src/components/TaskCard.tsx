import React from "react";
import { Card, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Task } from "../model/TaskModel";

interface TaskCardProps {
  task: Task;
  index: number;
  handleToggleComplete: (index: number) => void;
  handleEditTask: (index: number) => void;
  handleDeleteTask: (index: number) => void;
  handleCardClick: (index: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  handleToggleComplete,
  handleEditTask,
  handleDeleteTask,
  handleCardClick,
}) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center gap-buttom">
          <input
            type="checkbox"
            className="custom-checkbox mr-3"
            checked={task.completed}
            onChange={() => handleToggleComplete(index)}
          />
          <Card.Title
            className={`task-title mr-2 ${task.completed ? "completed" : ""}`}
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
            <small className="text-muted">Due: {task.dueDate}</small>
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
          <Button variant="danger" onClick={() => handleDeleteTask(index)}>
            <Trash />
            <span className="ml-1">Delete</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
