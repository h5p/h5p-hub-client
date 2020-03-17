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
    image: content.image || randomImage(),
    summary: content.summary || chance.sentence({ words: 12 }),
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

  for (let i = 0; i < 5; i++) {
    content.push(create({}));
  }

  // A long summary
  content[0].summary = chance.sentence({ words: 30 });

  // A long name
  content[1].owner = "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus";

  // A long title
  content[2].title = chance.sentence({ words: 40 });
  
  return {
    numResults: 1000,
    content: content
  };
};

export default get;