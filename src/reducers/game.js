const gameReducer = (state, action) => {
  const { type, currentName, winner } = action
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
    default:
      break
  }
}

export { gameReducer as default }
