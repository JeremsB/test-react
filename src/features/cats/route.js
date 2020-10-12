// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
} from './';
import WelcomeCats from './WelcomeCats';
import RandomCat from './RandomCat';

export default {
  path: 'cats',
  childRoutes: [
    { path: '', component: WelcomeCats, isIndex: true },
    { path: 'randomCat', component: RandomCat }
  ],
};
