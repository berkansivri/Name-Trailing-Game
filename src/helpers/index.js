const getRandomNumber = (max, min = 0) => ~~(Math.random() * (max - min) + min)

const checkName = (name = '', previousName, usedNames) =>
  !previousName || (previousName.slice(-1) === name[0] && !usedNames.includes(name))

const pickName = (previousName, usedNames, allNames) => {
  let name
  do {
    name = allNames[getRandomNumber(allNames.length)]
  } while (!checkName(name, previousName, usedNames))
  return name
}

const loseComputerByRatio = (ratio) => {
  return Math.random() <= ratio / 100
}

export { getRandomNumber, checkName, pickName, loseComputerByRatio }
