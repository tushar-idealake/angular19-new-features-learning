import { Routes } from '@angular/router';
import StarwarsListComponent from '../starwars-list/starwars-list.component';

const starWarsListRoutes: Routes = [
    {
        path: '',
        component: StarwarsListComponent,
        children: [
            {
                path: ':id',
                title: 'Star Wars Fighter',
                loadChildren: () => import ('./starwars-character.routes'),
            }
        ] 
    }
];

export default starWarsListRoutes;
