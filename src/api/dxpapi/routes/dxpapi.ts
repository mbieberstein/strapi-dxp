export default {
  routes: [
     {
      method: 'GET',
      path: '/dxpapi',
      handler: 'dxpapi.exampleAction',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
     },
     {
      method: 'PUT',
      path: '/dxp/update/:id',
      handler: 'dxpapi.update',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
     }
  ],
};
