let r;
for(r=2;r<=50;r++){
  let isPrime = true;
  for(let m=2;m<r;m++){
    if(r%m===0){
      isPrime = false;
      break;
    }
  }
  if(isPrime){
    console.log(r, "is prime");
  }
}