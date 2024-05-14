import type { Meta, StoryFn } from "@storybook/react"
import { useEffect, useState } from "react"

import { Progress as Prog, ProgressProps } from "./Progress"

const meta: Meta<ProgressProps> = {
  title: "Components/__DATA ENTRY__/Upload",
  component: Prog,
  argTypes: {
    bgColor: {
      control: false,
    },
    barColor: {
      control: false,
    },
  },
}

export default meta

const Template: StoryFn<ProgressProps> = (args) => {
  const [progress, setProgress] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState(0)
  //shoudl clear all the state
  const cancelUpload = () => {
    setProgress(0)
    setUploadSpeed(0)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
      setUploadSpeed(Math.random() * 550.521)
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  return <Prog {...args} progress={progress} uploadSpeed={uploadSpeed} cancelUpload={cancelUpload} />
}

export const Progress = Template.bind({})
Progress.args = {
  tooltipText: "Tooltip text",
  tooltipPosition: "top",
  progress: 50,
  uploadSpeed: 120,
  height: 4,
  fileName: "hello world.txt",
  cancelUpload: () => {},
}
