export const state = () => ({
  open: false
})

export const getters = {
  open: ({ open }) => open
}

export const mutations = {
  switchMenu (state) {
    state.open = !state.open
  },
  resetMenu (state) {
    state.open = false
  },
  setMenu (state, payload) {
    state.open = payload
  }
}
