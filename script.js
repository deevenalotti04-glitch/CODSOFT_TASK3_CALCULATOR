const display = document.getElementById("display");
const history = document.getElementById("history");

const buttons = document.querySelectorAll("button");

let expression = "";

// Button Click Events

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        handleInput(value);

    });

});

// Handle Input

function handleInput(value){

    if(value==="AC"){

        expression="";
        display.value="";
        history.textContent="";
        return;

    }

    if(value==="DEL"){

        expression=expression.slice(0,-1);
        display.value=expression;
        return;

    }

    if(value==="="){

        calculate();
        return;

    }

    expression+=value;
    display.value=expression;

}

// Calculate Result

function calculate(){

    try{

        history.textContent=expression+" =";

        let exp = expression.replace(/%/g,"/100");

        const result = eval(exp);

        if(result===undefined || Number.isNaN(result)){

            throw Error();

        }

        display.value=result;
        expression=result.toString();

    }

    catch{

        display.value="Error";
        expression="";

        setTimeout(()=>{

            display.value="";

        },1200);

    }

}

// Keyboard Support

document.addEventListener("keydown",(e)=>{

    const key=e.key;

    if("0123456789+-*/.%".includes(key)){

        expression+=key;
        display.value=expression;

    }

    else if(key==="Enter"){

        e.preventDefault();
        calculate();

    }

    else if(key==="Backspace"){

        expression=expression.slice(0,-1);
        display.value=expression;

    }

    else if(key==="Escape"){

        expression="";
        display.value="";
        history.textContent="";

    }

});