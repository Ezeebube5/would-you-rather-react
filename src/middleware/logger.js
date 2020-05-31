const logger = (store) => (next) => (action) => {
  console.groupCollapsed(action.type)
    const updatedValue = next(action)
    console.log('Action: ', action)
    console.log('Updated state: ', store.getState())
  console.groupEnd()
  return updatedValue
}

export default logger
