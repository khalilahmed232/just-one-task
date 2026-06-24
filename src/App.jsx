import { BadgeCheck } from "lucide-react";
import TaskCard from "./components/TaskCard";
import { tasks } from "./data/tasks";
import { useState, useEffect } from "react";
import { exercisesData } from "./data/exercise";
import {
  Check,
  ArrowDown,
  Circle,
  Star
} from "lucide-react";

import ExerciseCard from "./components/ExerciseCard";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [laterTasks, setLaterTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const savedTasks =
      localStorage.getItem("completedTasks");

    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "completedTasks",
      JSON.stringify(completedTasks)
    );
  }, [completedTasks, loaded]);

  useEffect(() => {
    const savedLaterTasks =
      localStorage.getItem("laterTasks");

    if (savedLaterTasks) {
      setLaterTasks(JSON.parse(savedLaterTasks));
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "laterTasks",
      JSON.stringify(laterTasks)
    );
  }, [laterTasks, loaded]);



  const handleDone = (taskId) => {
    setCompletedTasks((prev) => [...prev, taskId]);
  };

  const isTaskAvailable = (task) => {
    if (!task.dependsOn || task.dependsOn.length === 0) {
      return true;
    }

    return task.dependsOn.every((id) =>
      completedTasks.includes(id)
    );
  };

  const availableTasks = tasks.filter(
    (task) =>
      !completedTasks.includes(task.id) &&
      !laterTasks.includes(task.id) &&
      isTaskAvailable(task)
  );

  if (availableTasks.length === 0) {
    return (
      <div className="p-8">
        <h1>🎉 All tasks completed!</h1>
      </div>
    );
  }

  const currentTask = availableTasks[0];
  const upcomingTasks = availableTasks.slice(1);

  const lockedTasks = tasks.filter(
    (task) =>
      !completedTasks.includes(task.id) &&
      !isTaskAvailable(task)
  );


  const handleLater = (taskId) => {
    setLaterTasks((prev) => [...prev, taskId]);
  };


  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };



  const progress =
    Math.round(
      (completedTasks.length / tasks.length) * 100
    );

  const postponedTasks = tasks.filter(
    (task) => laterTasks.includes(task.id)
  );

  const handleRestoreLaterTasks = () => {
    setLaterTasks([]);
  };

  const buildJourney = (task) => {
    const journey = [];
    let current = task;

    while (
      current &&
      current.dependsOn &&
      current.dependsOn.length > 0
    ) {
      journey.unshift(current);

      current = getTaskById(
        current.dependsOn[0]
      );
    }

    if (current) {
      journey.unshift(current);
    }

    return journey;
  };

  const journey = selectedTask
    ? buildJourney(selectedTask)
    : [];

  return (
    <div className="w-full p-2 bg-slate-50 min-h-screen">
{/* 
      <ExerciseCard exercisesData={exercisesData}>

      </ExerciseCard> */}

      <div className="flex items-center gap-2 mb-6">
        <BadgeCheck size={28} />
        <h1 className="text-3xl font-bold">
          Just One Task
        </h1>
      </div>


    {/* <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-white rounded-xl shadow p-4 mb-4"> */}
          <div className="grid grid-cols-4 md:grid-cols-8 items-center gap-6 bg-white rounded-xl shadow p-4 mb-4">
          <button
          className="border px-3 py-1 rounded" 
          onClick={() => {
            localStorage.removeItem("completedTasks");
            setCompletedTasks([]);

            localStorage.removeItem("laterTasks");
            setLaterTasks([]);
          }}
        >
          Reset
        </button>

        <span>Available: {availableTasks.length}</span>
        <span>Completed: {completedTasks.length}</span>
        <span>Locked: {lockedTasks.length}</span>
        <span>Later: {laterTasks.length}</span>
        <span>
          {completedTasks.length}/{tasks.length}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
          {progress}%
        </span>
      </div>


      <h2 className="text-xl font-bold mb-4">
        Current Task
      </h2>

      <div className="max-w-xs">
        <TaskCard
          key={currentTask.id}
          task={currentTask}
          onDone={() => handleDone(currentTask.id)}
          onLater={() => handleLater(currentTask.id)}
          getTaskById={() => getTaskById(currentTask.id, tasks)}
          onViewJourney={() => setSelectedTask(currentTask)}
        />
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-bold mt-6 mb-4">
        Upcoming Tasks
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {upcomingTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDone={() => handleDone(task.id)}
            onLater={() => handleLater(task.id)}
            type="Upcoming Task"
            getTaskById={() => getTaskById(task.id, tasks)}
            onViewJourney={() => setSelectedTask(task)}
          />
        ))}
      </div>


      <hr />

      <h2 className="text-xl font-bold mt-6 mb-4">
        Locked Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {lockedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            type="Locked Task"
            locked={true}
            getTaskById={() => getTaskById(task.id, tasks)}
            onViewJourney={() => setSelectedTask(task)}
          />
        ))}
      </div>

      <hr className="p-2"/>


      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Later Tasks ({postponedTasks.length})
        </h2>

        <button
          className="px-4 py-2 border rounded-lg cursor-pointer"
          onClick={handleRestoreLaterTasks}
        >
          Restore All
        </button>
      </div>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {postponedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDone={() => handleDone(task.id)}
            onLater={() => handleLater(task.id)}
            type="Upcoming Task"
            getTaskById={() => getTaskById(task.id, tasks)}
            onViewJourney={() => setSelectedTask(task)}
          />
        ))}
      </div>



      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-125">
            <h2 className="text-2xl font-bold mb-4">
              Journey
            </h2>

            <h3 className="font-semibold">
              {selectedTask.title}
            </h3>

            <p className="text-gray-500 mb-4">
              {selectedTask.category}
            </p>

            {selectedTask.dependsOn?.length > 0 ? (
              <div>
                <p className="font-medium">
                  Journey:
                </p>

                <div className="flex flex-col items-center mt-6">

                  {journey.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex flex-col items-center"
                    >
                      <div className="flex items-center gap-2">
                        {task.id === selectedTask.id ? (
                          <Star
                            size={18}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ) : completedTasks.includes(task.id) ? (
                          <Check size={18} className="text-green-600"
                          />
                        ) : (
                          <Circle size={18} className="text-gray-400" />
                        )}

                        <span>
                          {task.title}
                        </span>
                      </div>

                      {index < journey.length - 1 && (
                        <div className="h-6 border-l-2 border-gray-300 my-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No dependencies</p>
            )}

            <button
              className="mt-6 border px-4 py-2 rounded"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;