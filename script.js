/* 
    La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "a" es convertida para "ai"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat"
*/

const capitalLetters = /[A-Z]/g 
const characters     = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúàèìòù']/g

const rules = {'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat'}

var firstTime = true;

const validateText = (text) => {
    return  text.match(capitalLetters) || 
            text.match(characters)     
            ? false 
            : true;
};

const copy = () => {
    console.log('Button copy for result...')
    let text = document.querySelector(".result-input").innerHTML
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log("Logrado!!!")
    })
    .catch((error) => {
        console.log(error)
    })
}

const init = (result) => {
    var newDiv = document.createElement("div");
    newDiv.className = 'result-input'
    var newContent = document.createTextNode(`${result}`);

    newDiv.appendChild(newContent)
    document.getElementById("msg-container").appendChild(newDiv)
    document.getElementById('search-img').style.display = 'none'; 
    document.querySelector('.msg-input').style.display = 'none'; 
    
    const button = document.createElement('button'); 
    button.type = 'button'; 
    button.id = 'btn-copy';
    button.setAttribute("onclick", "copy()")
    button.innerText = 'Copiar'; 
    document.getElementById('msg-container').appendChild(button); 
}

const encrypt = () => {
    console.log("Encrypting input text....")
    
    let result = '';
    let text = document.getElementById("txtInput").value;

    if (text.length === 0) {
        
        document.getElementById("txtInput").focus();
        document.getElementById("txtInput").placeholder = '¡Ingrese texto aqui por favor...!';

        document.getElementById('search-img').style.display = '';
        document.querySelector('.msg-input').style.display = ''; 

        document.querySelector('.result-input').style.display = 'none'; 
        document.getElementById('btn-copy').style.display = 'none';

    } else if (validateText(text)) {
        result = text.replaceAll(/[aeiou]/gi, key => rules[key])        
        if (firstTime) {
            firstTime = false   
            init(result)
        } else {
            console.log("reusing div for result----")
            document.querySelector(".result-input").innerHTML = `${result}`
        }
        console.log(result) 
    } else {
        console.log("error")
    }
};

const decrypt = () => {
    let result = '';
    let text = document.getElementById("txtInput").value;

    if (text.length === 0) {
        
        document.getElementById("txtInput").focus();
        document.getElementById("txtInput").placeholder = '¡Ingrese texto aqui por favor...!';

        document.getElementById('search-img').style.display = '';
        document.querySelector('.msg-input').style.display = ''; 

        document.querySelector('.result-input').style.display = 'none'; 
        document.getElementById('btn-copy').style.display = 'none';

    } else if (validateText) {
        Object.entries(rules).forEach(([key, value]) => {
            result = text.replaceAll(value, key)
            text = result
        });

        if (firstTime) {
            firstTime = false   
            init(result)
        } else {
            console.log("reusing div for result----")
            document.querySelector(".result-input").innerHTML = `${result}`
        }    
    }
}

