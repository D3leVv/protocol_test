import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import { Menu } from "lib/Menu/Menu"

export function MenuDemo() {
  return (
    <Menu>
      <Menu.Button prefixIcon={[<ArrowUpIcon />, <ArrowDownIcon />]}>Open</Menu.Button>
      <Menu.Content>
        <Menu.Label>My Account</Menu.Label>
        <Menu.Separator />
        <Menu.Group>
          <Menu.Item>
            Profile
            <Menu.Shortcut>⇧⌘P</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            Billing
            <Menu.Shortcut>⌘B</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            Settings
            <Menu.Shortcut>⌘S</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            Keyboard shortcuts
            <Menu.Shortcut>⌘K</Menu.Shortcut>
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.Item>Team</Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger>Invite users</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Email</Menu.Item>
              <Menu.Item>Message</Menu.Item>
              <Menu.Separator />
              <Menu.Item>More..</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
          <Menu.Item>
            New Team
            <Menu.Shortcut>⌘+T</Menu.Shortcut>
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item>GitHub</Menu.Item>
        <Menu.Item>Support</Menu.Item>
        <Menu.Item disabled>API</Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          Log out
          <Menu.Shortcut>⇧⌘Q</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
