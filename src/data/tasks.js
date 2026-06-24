export const tasks = [
  // Morning Routine
  { id: 5, title: "Wake Up", category: "Morning" },
  { id: 20, title: "Tooth Brush", category: "Morning", dependsOn: [5] },
  { id: 24, title: "Beard Trim", category: "Morning" },
  { id: 30, title: "Bath", category: "Morning", dependsOn: [170]  },
  { id: 170, title: "Face Wash", category: "Morning" },
  { id: 190, title: "Head Oil", category: "Morning" },


];