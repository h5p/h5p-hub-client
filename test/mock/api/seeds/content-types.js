const get = function(params, noResults) {
  return noResults ? [] : [
    {
      id: '1',
      label: 'Games',
      children: [
        {
          id: '10',
          label: 'Interactive Video',
        },
        {
          id: '11',
          label: 'Course Presentation'
        },
      ]
    },
    {
      id: '2',
      label: 'Questions',
      children: [
        {
          id: '21',
          label: 'Drag and Drop',
        },
        {
          id: '22',
          label: 'Drag the words',
        },
        {
          id: '23',
          label: 'Fill in the blanks',
        },
        {
          id: '24',
          label: 'Mark the Words',
        },
        {
          id: '25',
          label: 'Multiple Choice',
        },
        {
          id: '26',
          label: 'Summary',
        },
        {
          id: '27',
          label: 'True/False',
        },
        {
          id: '28',
          label: 'Hit the right thing',
        },
        {
          id: '29',
          label: 'Blink',
        },
        {
          id: '30',
          label: 'Scroll to win!',
        },
      ]
    },
    {
      id: '3',
      label: 'Quizzes',
      children: [
        {
          id: '31',
          label: 'Question Set'
        },
        {
          id: '32',
          label: 'Single Choice Set'
        },
      ]
    }
  ];
};

export default get;