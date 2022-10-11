/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/alive', async () => {
    return { status: 'API is running' }
  })

  /*    Create a api route POST '/moments' and declare that the 
      method MomentsController.store is the responsably by call the request
            Route.post('/moments', 'MomentsController.store')
*/

  // create a um 'crud' routes for resouce 'moments' declare thate all controller inside the MomentsCroller
  // the param 'apiOnly()' generate only router for api (CREATE, READE, UPDATE, DELETE)
  Route.resource('/moments', 'MomentsController').apiOnly()

  Route.post('/moments/:momentId/comments', 'CommentsController.store')
}).prefix('/api')
