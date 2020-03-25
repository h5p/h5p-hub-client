const chance = require('chance').Chance();

const randomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomContentType = function () {
  return randomFromArray([
    'Interactive Video',
    'Course Presentation',
    'Fill in the blanks',
    'Multiple Choice',
    'Branching scenario'
  ]);
};

const create = function(content) {
  content = content || {};

  const num = 2 + Math.floor(Math.random()*8);
  const screenshots = [];

  for (let i = 0; i < num; i++) {
    screenshots[i] = {
      'url': `test/images/image.jpg`,
      'alt': `Alt text`
    };
  }

  return {
    id: content.id || chance.guid(),
    title: content.title || chance.sentence({ words: 5 }),
    owner: content.owner || chance.name(),
    contentType: content.contentType || randomContentType(),
    icon: content.image || `test/images/image.jpg`,
    summary: content.summary || chance.sentence({ words: 12 }),
    description: content.description || chance.sentence({ words: 50 }),
    reviewed: content.reviewed || chance.bool(),
    preview_url: content.preview_url || chance.url(),
    screenshots: screenshots,
  };
};

const get = function (params, noResults) {

  const page = params.page || 1;
  const pages = 25;

  if (noResults) {
    return {
      numResults: 0,
      content: [],
      page: page,
      pages: pages
    };
  }

  let content = [];

  for (let i = 0; i < 5; i++) {
    content.push(create());
  }

  // A long summary
  content[0].summary = chance.sentence({ words: 30 });

  // A long name
  content[1].owner = "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus";

  // A long title
  content[2].title = chance.sentence({ words: 40 });
  
  return {
    numResults: 1000,
    content: content,
    pages: pages,
    page: page
  };
};

export default get;