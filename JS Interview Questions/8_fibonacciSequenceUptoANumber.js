// Write a JavaScript function that returns the Fibonacci sequence up to a given number of terms.

function fiboSequence(n) {
  let first_term = 0;
  let second_term = 1;
  let sequence = [];

  sequence.push(first_term);
  sequence.push(second_term);

  for (let i = 2; i < n; i++) {
    let next_term = first_term + second_term;
    sequence.push(next_term);

    first_term = second_term;
    second_term = next_term;
  }

  return sequence;
}

const num = 10;
console.log(fiboSequence(num));
