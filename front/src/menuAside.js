import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/users",
    label: "Utilisateur",
    icon: mdiAccountCircle,
  },
  {
    to: "/planning",
    label: "Planning",
    icon: mdiResponsive,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    to: "/tables",
    label: "Community",
    icon: mdiTable,
  },
  {
    to: "/forms",
    label: "Formation",
    icon: mdiSquareEditOutline,
  },
];
