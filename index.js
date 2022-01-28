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
  const json = JSON.stringify(respon.data);
//   const obj = JSON.parse(json);
//   const id = obj.data.addFormulas
  console.log("response Data : ", json); 
//   return json
}
/* addFormula(operandLVar, operandRVar) */
// dtQuery = addFormulas("a","b");
// data = post(dtQuery)

/* add(varibel A, variable B, id) */
// let dtQuery = add(3,2,"Rm9ybXVsYQ.YfLLiZVIAyXMAc-j");
// post(dtQuery)

/* removeFormulasByRoot(id) */
let dtQuery = remove("Rm9ybXVsYQ.YfLLiZVIAyXMAc-j");
post(dtQuery)