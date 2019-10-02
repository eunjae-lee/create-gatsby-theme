export const addReleaseTool = {
  questions: [
    {
      type: 'confirm',
      name: 'shouldAddReleaseTool',
      message: 'Add a release tool?',
      default: true,
    },
  ],
  run: ({ answers: { shouldAddReleaseTool } }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (shouldAddReleaseTool) {
          console.log('Adding a release tool....');
        } else {
          console.log('Skipping a release tool...');
        }
        resolve();
      }, 1000);
    });
  },
  finished: ({ answers: { shouldAddReleaseTool } }) => {
    if (shouldAddReleaseTool) {
      console.log('the release tool has been added!');
    } else {
      console.log('the release tool is not added.');
    }
  },
};
