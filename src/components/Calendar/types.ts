import { StatusEnum } from "lib/Status/Status"

export interface Meeting {
  id: string | number
  start: Date | number
  end: Date | number
  appointmentType?: string[]
  doctors: {
    name: string
    status: StatusEnum
    id: string
  }[]
}
