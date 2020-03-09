const chance = require('chance').Chance();

const randomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomContentType = function () {
  return randomFromArray([
    'Interactive Video',
    'Course Presentation',
    'Fill in the blanks',
    'Multiple Choice'
  ]);
};

const randomImage = function () {
  return randomFromArray([
    {      
      'src': 'test/images/1.png', 
      'alt': 'test/images/1.png'
    },
    {      
      'src': 'test/images/2.jpg', 
      'alt': 'test/images/2.jpg'
    },
    {      
      'src': 'test/images/3.jpg', 
      'alt': 'test/images/3.jpg'
    }
  ]);
};

const create = function(content) {
  content = content || {};

  return {
    id: content.id || chance.guid(),
    title: content.title || chance.sentence({ words: 5 }),
    owner: content.owner || chance.name(),
    contentType: content.contentType || randomContentType(),
    image: content.image || randomImage()
  };
};

const get = function (params, settings) {

  if (settings.noResults) {
    return {
      numResults: 0,
      content: []
    };
  }

  let content = [];

  for (let i = 0; i < 4; i++) {
    content.push(create({}));
  }

  // Add a long one to test wrapping in the UI
  content.push(create({
    title: chance.sentence({ words: 40 })
  }));
  
  return {
    numResults: 1000,
    content: content
  };
};

export default get;