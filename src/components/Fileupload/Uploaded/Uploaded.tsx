"use client"
import { EllipsisVerticalIcon, PaperClipIcon } from "@heroicons/react/24/outline"
import { Menu } from "components/Menu/Menu"

export interface UploadedProps {
  fileName: string
  deleteFile?: () => void
  downloadFile?: () => void
}

export const Uploaded = ({ fileName, deleteFile, downloadFile }: UploadedProps) => (
  <div className="flex items-center justify-between rounded-md border border-secondary-100 bg-background p-3 text-foreground">
    <div className="flex items-center gap-3">
      <PaperClipIcon className="h-5 w-5" />
      <p className="text-body2/medium"> {fileName} </p>
    </div>

    <Menu>
      <Menu.Button
        variant="text"
        impact="none"
        size="xs"
        className=" focus:ring-offset-0 focus:![--tw-ring-shadow:transparent]"
      >
        <EllipsisVerticalIcon className="h-5 w-5 stroke-2 text-secondary-500" />
      </Menu.Button>
      <Menu.Content>
        <Menu.Item onClick={deleteFile}>Delete</Menu.Item>
        <Menu.Item onClick={downloadFile}>Download</Menu.Item>
      </Menu.Content>
    </Menu>
  </div>
)
