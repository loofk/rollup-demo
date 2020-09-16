class Greeter {
  greeting: string

  constructor (message: string) {
    this.greeting = message
  }

  greet () {
    console.log('hello ts')
  }
}

export default Greeter