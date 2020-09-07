import home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': home, // default page
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
