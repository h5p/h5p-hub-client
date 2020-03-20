const get = function() {
  return [
    {
      id: '1',
      label: 'Humanities',
      children: [
        {
          id: '10',
          label: 'Arts',
          children: [
            {
              id: '100',
              label: 'Performing Arts',
            },
            {
              id: '101',
              label: 'Visual Arts',
            }
          ]
        },
        {
          id: '11',
          label: 'History'
        },
        {
          id: '12',
          label: 'Languages and literature'
        },
        {
          id: '13',
          label: 'Philosophy'
        },
        {
          id: '14',
          label: 'Theology'
        },
      ]
    },
    {
      id: '2',
      label: 'Social sciences',
      children: [
        {
          id: '21',
          label: 'Anthropology',
        },
        {
          id: '22',
          label: 'Archaeology',
        },
        {
          id: '23',
          label: 'Economics',
        },
        {
          id: '24',
          label: 'Human geography',
        },
        {
          id: '25',
          label: 'Political science',
        },
        {
          id: '26',
          label: 'Psychology',
        },
        {
          id: '27',
          label: 'Sociology',
        },
        {
          id: '28',
          label: 'Social Work',
        },
      ]
    },
    {
      id: '3',
      label: 'Natural Sciences',
      children: [
        {
          id: '31',
          label: 'Biology'
        },
        {
          id: '32',
          label: 'Chemistry'
        },
        {
          id: '33',
          label: 'Earth science'
        },
        {
          id: '34',
          label: 'Space sciences'
        },
        {
          id: '35',
          label: 'Physics'
        },
      ]
    }
  ];
};

export default get;