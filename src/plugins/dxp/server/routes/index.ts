
export default [
  {
    method: 'GET',
    path: '/test',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false
    },
  }, 
];
