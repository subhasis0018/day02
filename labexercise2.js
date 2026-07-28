let i;
for (i = 1; i <= 50; i++) {
    

if (i % 3 === 0) {
    console.log(i,"is fizz");
}
    else if (i % 5 === 0) {
        console.log(i,"is buzz");
    }
    else if (i % 3 === 0 && i % 5 === 0) {
        console.log(i," is fizzbuzz");
    }
}