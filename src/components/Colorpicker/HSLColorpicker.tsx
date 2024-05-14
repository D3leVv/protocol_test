import { Select } from "lib/Select/Select"
import { ColorFormatEnum } from "./types"

type HSLColorPickerProps = {
  colorFormat: ColorFormatEnum
  colorFormatChange: (colorFormat: ColorFormatEnum) => void
}

const options = Object.values(ColorFormatEnum)

export const HSLColorPicker = ({ colorFormat, colorFormatChange }: HSLColorPickerProps) => {
  return (
    <Select
      options={options}
      value={ColorFormatEnum[colorFormat]}
      onChange={colorFormatChange}
      renderProp={(val) => val}
    />
  )
}
//  <Select
//             className="!w-auto"
//             value={colorFormat}
//             onChange={colorFormatChange}
//         >
//             <Select.ButtonWrapper>
//                 <Select.DefaultButtonText value={colorFormat} />
//             </Select.ButtonWrapper>
//             <Select.OptionsWrapper
//                 additionalStyles={{
//                     maxWidth: 'auto !important',
//                     minWidth: 'auto !important',
//                 }}
//                 className="!w-auto"
//             >
//                 {Object.values(ColorFormatEnum).map((format) => (
//                     <Select.Option value={format} key={format}>
//                         <Select.DefaultOption>{format}</Select.DefaultOption>
//                     </Select.Option>
//                 ))}
//             </Select.OptionsWrapper>
//         </Select>
