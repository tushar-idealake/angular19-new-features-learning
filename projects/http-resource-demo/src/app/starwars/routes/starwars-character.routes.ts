import { Routes } from '@angular/router';
import StarwarsCharacterComponent from '../starwars-character/starwars-character.component';

const starWarsCharacterRoutes: Routes = [
    {
        path: '',
        component: StarwarsCharacterComponent,
        children: [
            {
                path: 'films',
                title: 'Star Wars Films',
                loadComponent: () => import('../starwars-movies/starwars-movies.component'),
            }
        ]
    }
];

export default starWarsCharacterRoutes;
