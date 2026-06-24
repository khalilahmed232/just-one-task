import dumbbellGoblet from '../assets/exercises/dumbbell-goblet.gif';
import arnoldPress from '../assets/exercises/arnold-press.gif';
import dumbellChestFly from '../assets/exercises/Dumbbell-Chest-Fly.gif';

export const exercisesData = {
  "workout_routine": [
    {
      "day": "DAY 1",
      "exercises": [
        { "exercise": "Goblet squats", "sets": 3, "reps": 10 , "gifurl": dumbbellGoblet},
        { "exercise": "Arnold press", "sets": 3, "reps": 10 , "gifurl": arnoldPress },
        { "exercise": "Chest flies", "sets": 3, "reps": 12, "gifurl": dumbellChestFly  },
        { "exercise": "Seated rows", "sets": 3, "reps": 12 },
        { "exercise": "Tricep pushdowns", "sets": 3, "reps": 12 },
        { "exercise": "Hammer curls", "sets": 3, "reps": 12 }
      ]
    },
    {
      "day": "DAY 2",
      "exercises": [
        { "exercise": "Leg press", "sets": 3, "reps": 12 },
        { "exercise": "Incline dumbbell press", "sets": 3, "reps": 10 },
        { "exercise": "Lat pulldowns", "sets": 3, "reps": 12 },
        { "exercise": "Barbell Romanian deadlifts", "sets": 3, "reps": 12 },
        { "exercise": "Lateral raises", "sets": 3, "reps": 15 },
        { "exercise": "Lying hamstring curls", "sets": 3, "reps": 12 }
      ]
    },
    {
      "day": "DAY 3",
      "exercises": [
        { "exercise": "Bulgarian split squats", "sets": 3, "reps": 10, "notes": "each leg" },
        { "exercise": "Barbell bench press", "sets": 3, "reps": 10 },
        { "exercise": "Single arm rows", "sets": 3, "reps": 12, "notes": "each arm" },
        { "exercise": "Leg extensions", "sets": 3, "reps": 12 },
        { "exercise": "Overhead tricep extensions", "sets": 3, "reps": 12 },
        { "exercise": "Cable curls", "sets": 3, "reps": 12 }
      ]
    }
  ]
};