
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { Header } from "./index"

import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  beforeEach(() => {
    render(<BrowserRouter><Header /></BrowserRouter>)
  })

  it('renders correctly the logo', () => {
    const altTextElement = screen.getByAltText(/Shopping Cart Application/i) as HTMLElement;
    expect(altTextElement).toBeInTheDocument();
  })

  it('renders the shopping cart widget', () => {
    expect(screen.getByAltText(/Go to Cart/i)).toBeInTheDocument();
  })
})