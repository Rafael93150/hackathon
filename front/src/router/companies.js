export const companiesRoutes = [
  {
    meta: {
      title: "Companies",
    },
    path: "/companies",
    name: "companies",
    component: () => import("@/views/companies/CompaniesView.vue"),
  },
  {
    meta: {
      title: "Créer une entreprise",
    },
    path: "/companies/create",
    name: "companies create",
    component: () => import("@/views/companies/CompaniesCreateView.vue"),
  },

  
];
