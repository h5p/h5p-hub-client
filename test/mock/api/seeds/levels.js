const get = function(params, noResults) {
  return noResults ? [] : [
    {
      id: 'beginner',
      label: 'Introductory/Beginner'
    },
    {
      id: 'intermediate',
      label: 'Intermediate'
    },
    {
      id: 'advanced',
      label: 'Advanced'
    }
  ];
};

export default get;