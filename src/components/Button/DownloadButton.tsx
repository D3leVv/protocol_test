import { Button, ButtonProps } from "lib/Button/Button"
import { ElementType } from "react"

export function DownloadButton(props: ButtonProps<ElementType> & { fileName: string; url: string }) {
  return (
    <Button
      {...props}
      onClick={() => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = "blob"
        xhr.onload = function () {
          const a = document.createElement("a")
          a.href = window.URL.createObjectURL(xhr.response)
          a.download = props.fileName
          a.style.display = "none"
          document.body.appendChild(a)
          a.click()
        }
        xhr.open("GET", props.url)
        xhr.send()
      }}
    >
      {props.children}
    </Button>
  )
}
