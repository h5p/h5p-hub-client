const get = function(params, noResults) {
  return noResults ? [] : [
    {
      "name": "beginner",
      "translation": null
    },
    {
      "name": "intermediate",
      "translation": null
    },
    {
      "name": "advanced",
      "translation": null
    }
  ];
};

export default get;