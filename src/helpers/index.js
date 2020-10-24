const getRandomNumber = (max) => ~~(Math.random() * max)

const checkName = (currentName = '', previousName, usedNames) =>
  !previousName || (previousName.slice(-1) === currentName[0] && !usedNames.includes(currentName))

const pickName = (names) => {
  let name
  do {
    name = names[getRandomNumber(names.length)]
  } while (!checkName(name))
  return name
}

const loseComputerByRatio = (ratio) => {
  return Math.random() <= ratio
}

export { getRandomNumber, checkName, pickName, loseComputerByRatio }
