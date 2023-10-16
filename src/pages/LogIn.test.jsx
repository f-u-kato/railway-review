/**
 * @jest-environment jsdom
 */
import { render, screen, test, expect } from '@testing-library/react'
import { LogIn } from './Login'

describe('Login', () => {
  test('login-form', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<LogIn />)

    const emailInput = screen.getByPlaceholderText('aaa@xxx.yy')
    const passwordInput = screen.getByPlaceholderText('Password')
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })
  test('label', () => {
    render(<LogIn />)
    const emailLabel = screen.getByText('メールアドレス')
    const passwordLabel = screen.getByText('パスワード')
    expect(emailLabel).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
  })
  test('button', () => {
    render(<LogIn />)
    const submitButton = screen.getByRole('button', { name: 'ログイン' })
    expect(submitButton).toBeInTheDocument()
  })
})
