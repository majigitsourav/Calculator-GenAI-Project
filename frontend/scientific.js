// Scientific Calculator Functions with API Integration
let isDegreeMode = true;

// Scientific function handlers
document.querySelectorAll('.btn-scientific').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;
        
        if (value === 'π') {
            calculator.currentInput = Math.PI.toString();
            calculator.shouldResetScreen = false;
            calculator.updateDisplay();
        } else if (value === 'e') {
            calculator.currentInput = Math.E.toString();
            calculator.shouldResetScreen = false;
            calculator.updateDisplay();
        } else if (value === '^') {
            calculator.setOperator('^');
        } else if (action === 'deg-rad') {
            toggleDegreeRadian();
        } else {
            // For functions like sin(, cos(, etc., append to input
            calculator.appendValue(value);
        }
    });
});

// Toggle between degree and radian mode
function toggleDegreeRadian() {
    isDegreeMode = !isDegreeMode;
    const btn = document.querySelector('.btn-scientific[data-action="deg-rad"]');
    if (btn) {
        btn.textContent = isDegreeMode ? 'DEG' : 'RAD';
    }
}

// Override calculate for scientific mode when in scientific tab
const basicCalculate = calculator.calculate.bind(calculator);

calculator.calculate = async function() {
    if (this.isScientificMode) {
        await this.calculateScientificExpression();
    } else {
        await basicCalculate();
    }
};
