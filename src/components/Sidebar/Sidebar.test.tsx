// import { fireEvent, render, screen, waitFor } from "@testing-library/react"
// import { navigation } from "lib/Sidebar/Sidebar.mock"
// import { Sidebar } from "./Sidebar"
//
// describe("Sidebar", () => {
//   it("should render", () => {
//     render(<Sidebar />)
//     const sidebar = screen.getByTestId("sidebar")
//     expect(sidebar).toBeInTheDocument()
//   })
//   it("should open and close", () => {
//     render(<Sidebar />)
//     const openCloseButton = screen.getByTestId("open-close-button")
//     expect(openCloseButton).toHaveAttribute("aria-label", "Open Sidebar")
//     fireEvent.click(openCloseButton)
//     expect(openCloseButton).toHaveAttribute("aria-label", "Close Sidebar")
//   })
//   it("should change url", async () => {
//     render(<Sidebar />)
//     const firstLink = screen.getByTestId(navigation[0].name)
//     fireEvent.click(firstLink)
//     await waitFor(() => {
//       expect(window.location.pathname).toBe(navigation[0].href)
//     })
//   })
// })
