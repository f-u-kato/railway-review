/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Login } from "../pages/Login"
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route ,Routes, Switch} from 'react-router-dom';
import { store } from '../store';

jest.mock('react-router-dom');

describe('Login test', () => {
    test('render form with 1 button', async () => {
        render(
          <Provider store={store}>
            <Login />
        </Provider>

        );
    
        const buttonList = await screen.findAllByRole('button');
        expect(buttonList).toHaveLength(1);
      });
    test("render form with 2 inputs", async () => {
        render(<Provider store={store}>
            <Login />
        </Provider>);
        const inputList = await screen.findAllByRole("input");
        expect(inputList).toHaveLength(2);
    });
    test("render form with 2 labels", async () => {
        render(<Provider store={store}>
            <Login />
        </Provider>);
        const labelList = await screen.findAllByRole("label");
        expect(labelList).toHaveLength(2);
    });
});