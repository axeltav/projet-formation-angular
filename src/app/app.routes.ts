import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
    path: "home",
        loadComponent: () => import('../views/home/home.component')
            .then(m => m.HomeComponent)
    },
    {
    path: "login",
        loadComponent: () => import('../views/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
    path: "register",
        loadComponent: () => import('../views/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
    path: "edit-article/:id",
        loadComponent: () => import('../views/article-edit/article-edit.component')
            .then(m => m.ArticleEditComponent)
    },
    {
    path: "**", // Wildcard (toute valeur)
    loadComponent: () => import('../views/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
    }
];
