const axios = require("axios");

const endpoint = "http://localhost:20001/graphql";
const headers = {
	"content-type": "application/json",
    "Authorization": "<token>"
};


function addFormulas(a, b){
    const addFormulasQuery = {
        query: `
        mutation {
            addFormulas(
              input: {
                formulas: [
                  {
                    operator: Add
                    operandLKind: Variable
                    operandLVar: "${a}"
                    operandRKind: Variable
                    operandRVar: "${b}"
                  }
                ]
              }
            ) {
              formulas {
                id
              }
            }
          }
        `
      }
      return addFormulasQuery;
    // console.log(addFormulas)
}

function add(a, b, id){
    const addQuery = {
        query: `
        {
            calculateFormula(
              id: "${id}"
              variables: { a: ${a}, b: ${b} }
            ) {
              result
              resultText
              formulaText
              variables
            }
          }
        `
      }
      return addQuery;
    // console.log(addFormulas)
}

function remove(id){
    const addQuery = {
        query: `
        mutation {
            removeFormulasByRoot(
              input: {
                id:"${id}"
              }
            ){
              removedCount
            } 
          }
        `
      }
      return addQuery;
    // console.log(addFormulas)
}

async function post(query){
  let respon = await axios({
    url: endpoint,
    method: 'post',
    data: query,
  })
  // console.log(JSON.stringify(respon.data));
  return respon.data;

}

/* addFormula(operandLVar, operandRVar) */

async function callAsync() {
  // create add formula
  let dtQuery = addFormulas("a","b");
  var respon = await post(dtQuery);
  var json = JSON.stringify(respon);
  var obj = JSON.parse(json);
  var id = obj.data.addFormulas.formulas[0].id;
  console.log("Add Formula created with id=", id); 

  //use add formula with constant variabel input
  dtQuery = add(3,2,id);
  respon = await post(dtQuery);
  json = JSON.stringify(respon);
  obj = JSON.parse(json);
  var result = obj.data.calculateFormula;
  console.log(result);

  //remove add formula
  dtQuery = remove(id);
  respon = await post(dtQuery);
  json = JSON.stringify(respon);
  obj = JSON.parse(json);
  result = obj.data.removeFormulasByRoot.removedCount;
  if(result == 0) console.log("addFormula with id =", id, "already removed");
  if(result == 1) console.log("addFormula with id =", id, "removed");
  // console.log(result);  
}

callAsync();

// Syntax for call single function
// callUseAddFormulas(3,2,id);
// let dtQuery = add(3,2,id);
// post(dtQuery)
// console.log("iid=",id);

/* addFormula(operandLVar, operandRVar) */
// let dtQuery = addFormulas("a","b");
// data = post(dtQuery)

/* add(varibel A, variable B, id) */
// let dtQuery = add(3,2,"Rm9ybXVsYQ.YfOJD5zpqCDYxS-Y");
// post(dtQuery)

/* removeFormulasByRoot(id) */
// let dtQuery = remove("Rm9ybXVsYQ.YfOJD5zpqCDYxS-Y");
// post(dtQuery)
