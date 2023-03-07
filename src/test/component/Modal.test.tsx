import { render, screen } from "@testing-library/react"
import Modal  from "../../components/ui/modals/Modal"
import { renderWithProviders } from "../utils/store-test"


test('should first', async () => {     
    await renderWithProviders(<Modal id="modal_test" />)
    const components = document.getElementById("modal_test")
    
    expect(components).not.toBe(null)
    expect(components).toBeInTheDocument()
 })

