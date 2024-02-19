var sum_to_n_a = function (n) {
    if (n % 2 === 1) {
        return ((((n - 1) / 2) + 1) * n);
    } else {
        return (n / 2) * (n + 1);
    }
};

var sum_to_n_b = function (n) {
    return ((n + 1) * n) / 2;
};

var sum_to_n_c = function (n) {
    var sum = 0;
    for (let i = 0; i <= n; i++) {
        sum = sum + i;
    } 
    return sum;
};

console.log(sum_to_n_a(8));
console.log(sum_to_n_b(8));
console.log(sum_to_n_c(8));
