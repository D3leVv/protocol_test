import { removeFromArgsTable } from "utils"

export const defaultArgTypes = {
  label: { control: { type: "text" } },
  ...removeFromArgsTable(["control", "shouldUnregister", "error", "success", "defaultValue", "rules", "name", "id"]),
}

export const defaultArgs = {
  label: "Test",
  name: "test",
  required: true,
  rules: { required: "This field is required" },
  id: "test",
}
