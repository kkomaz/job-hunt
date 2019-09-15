const convertDate = (unix) => {
  const date = new Date(unix)

  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}

export default convertDate
