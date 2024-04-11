// Using the reduce() Method
function sum_to_n_d(n) {
    return Array.from({ length: n }, function (_, i) { return i + 1; }).reduce(function (acc, curr) { return acc + curr; }, 0);
}
// Using Gauss' Formula (Bitwise Operations)
function sum_to_n_e(n) {
    return (n * (n + 1)) / 2; // Changed bitwise right shift to division
}
// Using a While Loop
function sum_to_n_f(n) {
    var sum = 0;
    var i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    return sum;
}
console.log("a) Using the reduce() method: ", sum_to_n_d(12));
console.log("\nb) Using Gauss’s formula with bitwise operations: ", sum_to_n_e(7));
console.log("\nc) Using a while loop: ", sum_to_n_f(4));
