// Write a JavaScript function to check if a given number is prime.

// Prime number are those which are either divisble by 1 or by themself like 2,3,5,7..
function checkPrime(n) {
  if (n <= 1) {
    return false;
  }

  for (let i = 2; i <= n / 2; i++) {
    if (n % i == 0) {
      return false;
    }

    return true;
  }
}

const number = 17;
console.log(checkPrime(number));
