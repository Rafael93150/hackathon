import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiReact,
} from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "Mon profil",
        to: "/profile",
      },
      {
        icon: mdiThemeLightDark,
        label: "Mode clair/sombre",
        isToggleLightDark: true,
      },
      {
        icon: mdiLogout,
        label: "Déconnexion",
        isLogout: true,
      },
      {
        isDivider: true,
      },
    ],
  },
  
  
];
