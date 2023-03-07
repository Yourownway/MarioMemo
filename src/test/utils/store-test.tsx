import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from '../../store/store'
import userReducer from '../../store/slice/userSlice'
import uiReducer from '../../store/slice/uiSlice'
import gameReducer from '../../store/slice/gameSlice'

import mockStore  from "../mock/store-mock"

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

const reducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  game:gameReducer
});

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = mockStore,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}