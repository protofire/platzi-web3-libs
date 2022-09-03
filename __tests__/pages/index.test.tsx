import { render, RenderResult, screen } from '@testing-library/react'
import Home from '../../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<Home />)
  })

  it('renders a heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Votaciones Platzi/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders a body content', () => {
    const heading = component.getByText('!Votaciones Platzi¡')
    expect(heading).toBeInTheDocument()
  })
})