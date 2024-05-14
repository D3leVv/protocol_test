import { Meta, StoryFn } from "@storybook/react"
import { Accordion } from "./Accordion"

const story: Meta = {
  title: "Components/__Data Display__/Accordion",
  component: Accordion,
}

export default story

const Template: StoryFn<typeof Accordion> = (args) => (
  <Accordion {...args}>
    <Accordion.Item>
      <Accordion.Button index={0}>hi</Accordion.Button>
      <Accordion.Panel index={0}>hello</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Button index={1}>hi</Accordion.Button>
      <Accordion.Panel index={1}>hi</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Button index={2}>hi</Accordion.Button>
      <Accordion.Panel index={2}>sss</Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)

export const Default = Template.bind({})
Default.args = {
  defaultOpen: [0],
}
