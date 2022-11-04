class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined

    };
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0, -1)
    };
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+number.toString()

    };
    chooseOperation(operation){
        if(this.currentOperand==='') return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand=''

    };
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation){
            case '+':
                computation = prev + curr
                break

            case '*':
                computation = prev * curr
                break

            case '-':
                computation = prev - curr
                break

            case '÷':
                computation = prev / curr
                break

            default:
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand=''

    };

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerPart = parseFloat(stringNumber.split('.')[0]);
        const decimalPart = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerPart)){
            integerDisplay=''
        }else{
            integerDisplay=integerPart.toLocaleString('en',{
                maximumFractionDigits:0});
        }
        if(decimalPart!=null){
            return `${integerDisplay}.${decimalPart}`;
        }else{
            return integerDisplay
        };


        
        //this is one of many ways to make your number shows comas after every set of three digits
        //however, it poses many problems when it comes to starting by a period or zero as it won't be able to convert it to a float
        //that is why we gave up this way and start this other of splitting the number into parts firsts

        /*const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')*/
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){
            this.previousOperandTextElement.innerText =
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText = ''
        };   
    };
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener('click',button => {
    calculator.compute();
    calculator.updateDisplay()
});

clearAllButton.addEventListener('click',button => {
    calculator.clear();
    calculator.updateDisplay()
});

deleteButton.addEventListener('click',button => {
    calculator.delete();
    calculator.updateDisplay()
});