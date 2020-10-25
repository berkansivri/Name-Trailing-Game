const gameReducer = (state, action) => {
  const { type, currentName, winner, initialState } = action
  switch (type) {
    case 'setCurrentName':
      return {
        currentName,
        usedNames: [...state.usedNames, currentName],
      }
    case 'setWinner':
      return {
        ...state,
        winner,
      }
    case 'newGame':
      return { ...initialState }
    default:
      break
  }
}

export { gameReducer as default }
