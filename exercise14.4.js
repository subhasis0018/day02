//right angled triangle pattern
let n;
for(n=1;n<=5;n++){
    let row="";
    for(let m=1;m<=n;m++){
        row+="*";
    }
    console.log(row);
}
console.log("\n");
//centered pyramid
let i;
for(i=1;i<=5;i++){
    let row="";
    for(let j=1;j<=5-i;j++){
        row+=" ";
    }
    for(let k=1;k<=2*i-1;k++){
        row+="*";
    }
    console.log(row);
}