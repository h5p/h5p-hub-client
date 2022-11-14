const chance = require('chance').Chance();

const randomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomContentType = function () {
  return randomFromArray([
    "H5P.MultiChoice 1.14",
    "H5P.ImageSlider 1.0"
  ]);
};

const create = function (content) {
  content = content || {};

  const num = 2 + Math.floor(Math.random() * 8);
  const screenshots = [];

  for (let i = 0; i < num; i++) {
    screenshots[i] = {
      'url': 'test/images/image.jpg',
      'alt': 'Alt text'
    };
  }

  const owner = content.owner || chance.name();

  return {
    id: content.id || chance.guid(),
    title: content.title || chance.sentence({ words: 5 }),
    owner: owner,
    content_type: content.contentType || randomContentType(),
    icon: content.image || 'test/images/image.jpg',
    summary: content.summary || chance.sentence({ words: 12 }),
    description: content.description || chance.sentence({ words: 150 }),
    reviewed: content.reviewed || chance.bool(),
    preview_url: content.preview_url || chance.url(),
    screenshots: screenshots,
    language: randomFromArray([
      'en',
      'nb',
      'ss',
      "da",
      "nl",
      "fr",
      "it"]),
    publisher: {
      id: content?.publisher?.id || chance.integer({min: 1}),
      name: owner,
      description: chance.sentence({ words: 50 }),
      image: 'test/images/image.jpg',
    },
    license: {
      id: randomFromArray(['mit', 'cc', 'ocl', 'opl', 'gfdl']),
      version: 1
    },
    disciplines: ["architecture", "business"],
    level: randomFromArray(['beginner', 'intermediate', 'advanced']),
    size: randomFromArray([4868, 12495, 146589, 1759864])
  };
};

const get = function (params, noResults) {

  const page = params.page || 1;
  const pages = 25;
  const limit = params.limit || 10;

  if (noResults) {
    return {
      numResults: 0,
      content: [],
      page: page,
      pages: pages
    };
  }

  let content = [];

  for (let i = 0; i < limit; i++) {
    content.push(create());
  }

  // A long summary
  content[0].summary = chance.sentence({ words: 30 });

  // A non-existing image:
  content[0].icon = 'does-not-exist.jpg';

  // A long name
  content[1].owner = "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus";
  content[1].publisher.name = content[1].owner;
  content[1].publisher.image = null;

  // No image at all
  delete content[1].icon;

  // A long title
  content[2].title = chance.sentence({ words: 40 });

  return {
    numResults: 1000,
    content: content,
    pages: pages,
    page: page,
    counts: {publisher: chance.integer({min: 1, max: 100})},
    filterCounts: {
      allows_commercial_use: {
        0: 123,
        1: 234,
      },
      can_be_modified: {
        0: 213,
        1: 324,
      },
      content_type: {
        'H5P.MultiChoice': 345,
        'H5P.ImageSlider': 321,
      },
      disciplines: {
        'architecture': 111,
        'business': 112,
        'curriculum-and-instruction': 113,
        'economics': 114,
      },
      language: {
        'aa': 333,
        'bg': 444,
      },
      level: {
        beginner: 110,
        intermediate: 220,
        advanced: 330,
      },
      reviewed: {
        0: 432,
        1: 568,
      },
    },
  };
};

export default get;
