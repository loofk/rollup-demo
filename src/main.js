import sayHello from './modules/a'
import _ from 'lodash'
import Greeter from './modules/b'

const arr = _.concat([1, 2, 3], 4, 5)

const a = new Greeter()
a.greet()

sayHello('Rollup')