const gameReducer = (state, action) => {
  const { name, player } = action

  switch (action.type) {
    case 'setName':
      console.log('dispatch setName:', name)
      console.log('dispatch return', {
        ...state,
        currentName: name,
        usedNames: [...state.usedNames, name],
      })
      return {
        ...state,
        currentName: name,
        usedNames: [...state.usedNames, name],
      }
    case 'setWinner':
      return {
        ...state,
        winner: player,
      }
    default:
      break
  }
}

export { gameReducer as default }
