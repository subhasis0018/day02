let marks= prompt("Enter your marks");
if(marks<=100 && marks>=90){
    console.log("grade a");
} else if(marks<=89 && marks>=75){
    console.log("grade b");
} else if (marks<=74 && marks>=60){
    console.log("grade c");
} else if (marks<=59 && marks>=40){
    console.log("grade d");
}
    else if (marks<=39 && marks>=0){
    console.log("fail");
}
else
    console.log('invalid marks');