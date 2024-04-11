// Using the reduce() Method
function sum_to_n_d(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
}

// Using Gauss' Formula (Bitwise Operations)
function sum_to_n_e(n: number): number {
  return (n * (n + 1)) / 2; // Changed bitwise right shift to division
}

// Using a While Loop
function sum_to_n_f(n: number): number {
  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
}

console.log("a) Using the reduce() method: ", sum_to_n_d(5));
console.log(
  "\nb) Using Gauss’s formula with bitwise operations: ",
  sum_to_n_e(5)
);
console.log("\nc) Using a while loop: ", sum_to_n_f(5));
