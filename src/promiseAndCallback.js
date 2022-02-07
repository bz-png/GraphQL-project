function badCalc(num1, num2) {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) resolve(num1 * num2);
      else reject('Oopsy...');
    })
  }
/*
  function getMul(){
    for(let i=0; i<50; i++){
        console.log("i=", i, badCalc(i,i+1));
    }
}
*/
/*
function getMul(){
    for(let i=0; i<50; i++){
        let res = badCalc(i,i+1).then(res => console.log("i =", i, "res=", res))
    }
}
*/
/*
function getMul(){
    for(let i=0; i<50; i++){
        let res = badCalc(i,i+1)
        .then(res => {
            console.log("i =", i, "res=", res);
        },
        fail => {
            console.log(console.error(fail));
        })
    }
}
*/
async function getMul(){
    for (let i=0; i<50; i++){
        try {
            let res = await badCalc(i, i+1);
            console.log("i", i, "res=", res+5);
        } catch(error) {
            console.log(error);
        }
    }
}
getMul();
