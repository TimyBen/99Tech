//Iterative Addition
var sum_to_n_a = function (n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

//Arithmetic Series Formula
var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2;
};

//Recursion
var sum_to_n_c = function (n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sum_to_n_c(n - 1);
    }
};
console.log("Sum using Iteration: " + sum_to_n_a(5));
console.log("Sum using Arithmetic Series Formula: " + sum_to_n_b(5));
console.log("Sum using Recursion: " + sum_to_n_c(5));