export default class Test {
  constructor(options) {
    console.log("construct")
  }
}

const helperTest = {
	getImage: () => {
    console.log("helper get image")
  }
}

export {
  helperTest,
  Test
}