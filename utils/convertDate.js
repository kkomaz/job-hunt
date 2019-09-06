const convertDate = (unix) => {
  const date = new Date(unix)

  console.log(date);

  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}

export default convertDate
