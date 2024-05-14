import { Button } from "lib/Button/Button"
import { defaultColors } from "./constants"

type SavedColorsProps = {
  handleColorChange: (color?: string) => void
}

export const SavedColors = ({ handleColorChange }: SavedColorsProps) => {
  return (
    <div className="mt-2 flex w-full flex-col gap-3 px-4">
      <div className="flex w-full items-center justify-between text-body3/medium">
        <span className="">Saved colors:</span>
      </div>
      <div className="scrollbar-hide grid max-h-[100px] grid-cols-7 gap-1 overflow-y-auto">
        {defaultColors.map((item) => (
          <Button
            size="xs"
            className="!ring-0 focus:!ring-0 focus:!ring-offset-0"
            key={item}
            shape="rounded"
            onClick={() => handleColorChange(item)}
            style={{
              background: item,
            }}
          ></Button>
        ))}
      </div>
    </div>
  )
}
