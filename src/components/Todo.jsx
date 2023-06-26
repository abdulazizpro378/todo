import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./Todo.scss";

function Todo() {
  const [toDo, settoDo] = useState([
    { id: 1, title: "task 1", status: false },
    { id: 2, title: "task 2", status: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [updateDate, setUpdateData] = useState("");

  //   add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      settoDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //   delete task

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    settoDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id ) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    settoDo(newTask);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateDate.id,
      title: e.target.value,
      status: updateDate.status ? true : false,
    };

    setUpdateData(newEntry);
  };

  const updateTask = (e) => {
    let fillterRecords = [...toDo].filter((task) => task.id !== updateDate.id);
    let updateObject = [...fillterRecords, updateDate];
    settoDo(updateObject);
    setUpdateData("");
  };

  return (
    <div
      className="Container
     App"
    >
      <br /> <br />
      <h2>To Do list App</h2>
      <br /> <br />
      {/* update task */}
      {updateDate && updateDate ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateDate && updateDate.tit}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
                type="text"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"

              >
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row mr-b">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
                type="text"
              />
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-success">
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}




      {toDo && toDo.length ? "" : "no Task"}
      {toDo &&
        toDo
          .sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          })
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber"> {index + 1}</span>
                    <span className="taskText"> {task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                     onClick={(e) => markDone(task.id)}
                      title="Completed / Not Completed"
                     
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>

                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default Todo;
