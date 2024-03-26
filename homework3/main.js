function* fizzbuzz() {
  let i = 1n;

  while (true) {
    if (i % 15n === 0n) {
      yield 'FizzBuzz';
    } else if (i % 3n === 0n) {
      yield 'Fizz';
    } else if (i % 5n === 0n) {
      yield 'Buzz';
    } else {
      yield i;
    }

    i += 1n;
  }
}

const myFizzBuzz = fizzbuzz();

for (let i = 0; i < 100; i += 1) {
  console.log(myFizzBuzz.next());
}
