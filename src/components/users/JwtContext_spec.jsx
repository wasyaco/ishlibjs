import Adapter from "enzyme-adapter-react-16"
import * as enzyme from "enzyme"
import { mount, shallow } from "enzyme"
import React, { useState } from "react"
import { act } from '@testing-library/react'

import { JwtContextProvider, LoginWithPassword } from "."
import { logg, request } from "$shared"

enzyme.configure({ adapter: new Adapter() })

/*
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

localStorage.getItem = new localStorageMock()
global.localStorage = new LocalStorageMock
*/

const mockApi = {
  getMyAccount: () => {},
  postLoginWithPassword: () => {},
}


describe("JwtContextProvider", () => {
  beforeEach(() => {
    jest.spyOn(mockApi, 'getMyAccount' ).mockRejectedValue({})
    // jest.spyOn(mockApi, 'postLoginWithPassword').mockResolvedValue({ data: { email: 'dataz-2@gmail.com' } })
  })

  it("checks if the user is logged in, every time", async () => {
    let component = mount(<JwtContextProvider api={mockApi} >
      <div>hello</div>
    </JwtContextProvider>)

    await act(() => new Promise(setImmediate))
    expect(mockApi.getMyAccount).toHaveBeenCalled()
  })
})

describe("LoginWithPassword", () => {

  beforeEach(() => {
    jest.spyOn(mockApi, 'getMyAccount' ).mockResolvedValue({ data: { email: 'dataz-1@gmail.com' } })
    jest.spyOn(mockApi, 'postLoginWithPassword').mockResolvedValue({ data: { email: 'dataz-2@gmail.com' } })
  })

  it("submits on Enter", async () => {
    let component = mount(<JwtContextProvider api={mockApi} >
      <LoginWithPassword />
    </JwtContextProvider>)
    expect(component.find('input[type="password"]').length).toEqual(1)

    component.find('input[type="password"]').simulate('keydown', { key: 'Enter' })
    await act(() => new Promise(setImmediate))

    expect(mockApi.postLoginWithPassword).toHaveBeenCalled()
  })

})
