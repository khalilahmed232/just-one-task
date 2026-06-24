

export default function ExerciseCard(exercisesData) {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Routine Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Daily Exercise Tracker
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Individual exercise breakdown with visual guides
        </p>
      </div>

      {/* Map through each day */}
      {exercisesData.exercisesData.workout_routine.map((routineDay, dayIdx) => {
        // Define distinct border/accent colors based on the index for visual variety
        const colors = [
          'from-blue-500 text-blue-600 bg-blue-600',
          'from-purple-500 text-purple-600 bg-purple-600',
          'from-emerald-500 text-emerald-600 bg-emerald-600'
        ];
        const colorClass = colors[dayIdx % colors.length];

        return (
          <div key={routineDay.day} className="mb-12">
            {/* Day Header Section */}
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 tracking-wide uppercase">
                {routineDay.day}
              </h2>
              <div className={`h-px flex-1 bg-gradient-to-r ${colorClass.split(' ')[0]} to-transparent`} />
            </div>
            
            {/* Exercises Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {routineDay.exercises.map((item, exIdx) => (
                <div 
                  key={`${dayIdx}-${exIdx}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
                >
                  {/* Card Media Header Container */}
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <img 
                        className="w-full h-full object-contain" 
                        src={item.gifurl}
                        alt={`${item.exercise} execution`}
                        onError={(e) => {
                            // Safe image fallback fallback if local GIF path isn't mapped
                            e.target.onerror = null; 
                            e.target.src = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=500&q=80';
                            e.target.className = 'w-full h-full object-cover opacity-40 grayscale';
                        }}
                    />
                    {/* Floating Rep Counter Badge */}
                    <span className={`absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm ${colorClass.split(' ')[2]}`}>
                      {item.sets} x {item.reps}
                    </span>
                  </div>

                  {/* Card Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base">
                        {item.exercise}
                      </h3>
                      {item.notes && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}



