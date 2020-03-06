// TODO - remove elsewhere
// Put here for now just to test the async capabilities
export const search = (query) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(query=="1" ? [
            {
              title: 'My fantastic content',
              id: 1
            }, {
              title: 'Another amazing H5P',
              id: 2
            }, {
              title: 'How to avoid being sick',
              id: 3
            }
          ] : [
            {
              title: 'Something cool',
              id: 1
            },
            {
              title: 'Even cooler',
              id: 2
            }
          ]);
        }
        else {
          reject();
        }
      }, 3000);
    });
  };
}