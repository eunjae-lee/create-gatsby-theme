export const addReleaseTool = {
  questions: [
    {
      type: "confirm",
      name: "addReleaseTool",
      message: "Add a release tool?",
      default: true
    }
  ],
  run: ({ answers: { addReleaseTool } }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (addReleaseTool) {
          console.log("Adding a release tool....");
        } else {
          console.log("Skipping a release tool...");
        }
        resolve();
      }, 1000);
    });
  },
  finished: ({ answers: { addReleaseTool } }) => {
    if (addReleaseTool) {
      console.log("the release tool has been added!");
    } else {
      console.log("the release tool is not added.");
    }
  }
};
