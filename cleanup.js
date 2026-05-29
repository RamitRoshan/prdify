const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'backend/src/controllers/tripController.js',
  'backend/src/models/Trip.js',
  'backend/src/routes/tripRoutes.js',
  'backend/src/services/planner/itineraryPlanner.js',
  'backend/src/services/tools/osmService.js',
  'backend/src/services/tools/placesService.js',
  'backend/src/services/tools/hotelService.js',
  'backend/src/services/tools/weatherService.js',
  'backend/src/services/tools/budgetService.js',
  'frontend/src/pages/Planner.jsx',
  'frontend/src/pages/Trips.jsx',
  'frontend/src/pages/TripDetails.jsx',
  'frontend/src/pages/About.jsx',
  'frontend/src/components/planner/MapSection.jsx',
  'frontend/src/components/planner/ResultsUI.jsx',
];

const dirsToDelete = [
  'backend/src/services/planner',
  'backend/src/services/tools',
  'frontend/src/components/planner'
];

filesToDelete.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted: ${fullPath}`);
  }
});

dirsToDelete.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmdirSync(fullPath, { recursive: true });
      console.log(`Deleted directory: ${fullPath}`);
    } catch (e) {
      console.error(`Failed to delete dir: ${fullPath}`);
    }
  }
});
