const get = function () {
  return [
    {
      id: 'games',
      label: 'Games',
      children: [
        {
          id: 'flashcards',
          label: 'Flashcars'
        },
        {
          id: 'memoryGame',
          label: 'Memory Game'
        }
      ]
    },
    {
      id: 'multimedia',
      label: 'Multimedia',
      children: [
        {
          id: 'flashcards',
          label: 'Flashcards'
        },
        {
          id: 'collage',
          label: 'Collage'
        },
        {
          id: 'hotspot',
          label: 'Find the Hotspot'
        }
      ]
    },
    {
      id: 'questions',
      label: 'Questions',
      children: [
        {
          id: 'hotspot',
          label: 'Find the hotspot'
        },
        {
          id: 'flashcards',
          label: 'Flashcars'
        },
        {
          id: 'multipleChoice',
          label: 'Multiple choice'
        }
      ]
    }
  ];
};

export default get;
