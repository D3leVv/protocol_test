import { Meta, StoryObj } from "@storybook/react"
import { Kanban } from "lib/Kanban/Kanban"
import { StatusEnum } from "lib/Status/Status"

export enum KanbanVariantEnum {
  new = "#c1d3fc",
  accepted = "#3E79F7",
  completed = "#17b530",
  rejected = "#ffbe18",
  undecided = "#ff7918",
}
const dummyData = [
  {
    id: 1,
    status: "new",
    title: "Patricia Jansen",
    dateOfBird: "02-07-1990",
    subTitle: "01-11-2023",
    tagText: "ID verification",
    variant: [
      { status: StatusEnum.Green, statusText: "Correct sign up" },
      {
        status: StatusEnum.Red,
        statusText: "ID verification incorrect - check manually",
      },
    ],
    onReject: () => console.log("reject"),
    onSuccess: () => console.log("success"),
  },
  {
    id: 2,
    title: "Patricia Jansen",
    status: "accepted",
    dateOfBird: "02-07-1990",
    subTitle: "01-11-2023",
    variant: [{ status: StatusEnum.Green, statusText: "Correct sign up" }],
    onReject: () => console.log("reject"),
    onSuccess: () => console.log("success"),
    statusText: "Correct sign up",
  },
  {
    id: 3,
    title: "Patricia Jansen",
    status: "completed",
    dateOfBird: "02-07-1990",
    subTitle: "01-11-2023",
    variant: [{ status: StatusEnum.Green, statusText: "Correct sign up" }],
    onReject: () => console.log("reject"),
    onSuccess: () => console.log("success"),
    statusText: "Correct sign up",
  },
  {
    id: 4,
    title: "Patricia Jansen",
    status: "rejected",
    dateOfBird: "02-07-1990",
    subTitle: "01-11-2023",
    variant: [{ status: StatusEnum.Green, statusText: "Correct sign up" }],
    onReject: () => console.log("reject"),
    onSuccess: () => console.log("success"),
    statusText: "Correct sign up",
  },
]

const kanbanColumns = Object.keys(KanbanVariantEnum) as (keyof typeof KanbanVariantEnum)[]

const meta: Meta<typeof Kanban> = {
  title: "Components/Navigation/Kanban",
  component: Kanban,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    return (
      <Kanban>
        {kanbanColumns.map((column) => (
          <Kanban.Column
            key={column}
            columnTitle={column}
            footer={<p className="text-sm text-secondary-500">Footer</p>}
            bgColor={KanbanVariantEnum[column as keyof typeof KanbanVariantEnum]}
          >
            {dummyData
              .filter((item) => item.status === column)
              .map((item) => (
                <Kanban.Item key={item.id}>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold text-primary-500">{item.title}</div>
                        <div className="text-xs text-secondary-500">{item.dateOfBird}</div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold text-primary-500">{item.subTitle}</div>
                        <div className="text-xs text-secondary-500">{item.tagText}</div>
                      </div>
                    </div>
                  </div>
                </Kanban.Item>
              ))}
          </Kanban.Column>
        ))}
      </Kanban>
    )
  },
}
