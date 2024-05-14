import { Meta } from "@storybook/react"
import { Slider, SliderProps } from "./Slider"

export default {
  title: "Components/Navigation/Slider",
  component: Slider,
  args: {
    title: "Slider Title",
    tooltipText: "Slider Tooltip",
    tooltipPosition: "top",
    slideDirection: "right",
  },
} as Meta

const Template = (args: SliderProps) => (
  <Slider {...args}>
    {({ open }) => (
      <>
        <Slider.Button>{open ? "Close Slider" : "Open Slider"}</Slider.Button>
        <Slider.Panel>
          <Slider.Title />
          <div>Content</div>
        </Slider.Panel>
      </>
    )}
  </Slider>
)

export const Default = Template.bind({})
