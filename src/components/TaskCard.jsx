import { Check, ClockFading, Lock } from "lucide-react";

function TaskCard({
  task,
  onDone,
  onLater,
  onViewJourney,
  locked = false,
  getTaskById
}) {
  return (



    
    <div
      className={`
        rounded-xl p-3 shadow bg-white
        w-full max-w-xs 
        flex flex-col items-center 
        ${locked
          ? "bg-gray-100 text-gray-500"
          : "bg-white"}
      `}
    >
      <div className="w-full">
        <p className="text-xs text-gray-500">
          {task.category}
        </p>

        <p className="text-xl font-semibold mt-1">
          {task.title}
        </p>
      </div>

      {locked ? (
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center gap-2">
            <Lock size={18} />
            <span>Locked</span>
          </div>

          {task.dependsOn?.length > 0 && (
            <div className="text-xs mt-3 text-center">
              <p>Waiting for:</p>

              {task.dependsOn.map((id) => (
                <p key={id}>
                  {getTaskById?.(id)?.title}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 mt-4">
          <button
            className="px-3 py-1.5 bg-green-500 text-white rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={onDone}
          >
            <Check size={18} />
            Done
          </button>

          <button
            className="px-3 py-1.5 border rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={onLater}
          >
            <ClockFading size={18} />
            Later
          </button>
        </div>
      )}

      <button
        className="mt-3 text-sm text-blue-600 cursor-pointer"
        onClick={onViewJourney}
      >
        View Journey →
      </button>
    </div>
  );
}

export default TaskCard;