const get = function(params, noResults) {
  return noResults ? [] : [
    {
      id: 'en',
      label: 'English'
    },
    {
      id: 'nb',
      label: 'Norwegian bokmål'
    },
    {
      id: 'ss',
      label: 'A strange language with a long name to make the UI a little harder to implement :)'
    }
  ];
};

export default get;