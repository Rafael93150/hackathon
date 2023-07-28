export const usersRoutes = [
  {
    meta: {
      title: "Utilisateurs",
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/users/UsersView.vue"),
  },
  {
    meta: {
      title: "Créer un utilisateur",
    },
    path: "/users/create",
    name: "users create",
    component: () => import("@/views/users/UsersCreateView.vue"),
  },
  {
    meta: {
      title: "User details",
    },
    path: "/users/:id",
    name: "userDetail",
    component: () => import("@/views/users/UserDetail.vue"),
  },
  {
    meta: {
      title: "Modifier un utilisateur",
    },
    path: "/users/update/:userId",
    name: "usersUpdate",
    component: () => import("@/views/users/UsersUpdateView.vue"),
  }
];
