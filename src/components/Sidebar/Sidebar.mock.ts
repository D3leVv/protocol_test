import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from "@heroicons/react/24/outline"
export const navigation = [
  { name: "Projects", href: "/projects", icon: FolderIcon, current: false },
  { name: "Deployments", href: "/deployments", icon: ServerIcon, current: true },
  { name: "Activity", href: "/activity", icon: SignalIcon, current: false },
  { name: "Domains", href: "/domains", icon: GlobeAltIcon, current: false },
  { name: "Usage", href: "/usage", icon: ChartBarSquareIcon, current: false },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon, current: false },
]
