export const usersRoutes = [
  {
    meta: {
      title: "Users",
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/users/UsersView.vue"),
  },
  {
    meta: {
      title: "Create user",
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
];
