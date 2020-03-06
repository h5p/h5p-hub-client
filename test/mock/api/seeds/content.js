const chance = require('chance').Chance();

const get = function() {
  let content = [];

  for (let i = 0; i < 9; i++) {
    content[i] = {
      id: i,
      title: chance.sentence({ words: 5 }),
    };
  }

  // Add a long one to test wrapping in the UI
  content[content.length] = {
    id: content.length,
    title: chance.sentence({ words: 40 })
  };
  
  return content;
};

export default get;