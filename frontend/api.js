// API Configuration - Always use absolute URL to backend
// Can override with ?api_url= query parameter
const urlParams = new URLSearchParams(window.location.search);
const API_BASE_URL = urlParams.get('api_url') || 'http://localhost:8000/api';

// Log API configuration
console.log('=== API Configuration ===');
console.log('Window location:', window.location.href);
console.log('Protocol:', window.location.protocol);
console.log('Hostname:', window.location.hostname);
console.log('Port:', window.location.port);
console.log('API Base URL:', API_BASE_URL);
console.log('========================');

// Check API connectivity
async function checkAPIConnection() {
    const statusElement = document.getElementById('api-status');
    if (!statusElement) return;
    
    try {
        const response = await fetch(API_BASE_URL.replace('/api', '/health'));
        if (response.ok) {
            statusElement.textContent = '✓ API Connected';
            statusElement.className = 'api-status connected';
            console.log('✓ API connection successful');
        } else {
            statusElement.textContent = '✗ API Error: ' + response.status;
            statusElement.className = 'api-status error';
            console.error('✗ API connection failed:', response.status);
        }
    } catch (error) {
        statusElement.textContent = '✗ API Unreachable';
        statusElement.className = 'api-status error';
        console.error('✗ API unreachable:', error);
    }
}

// Check connection on page load
document.addEventListener('DOMContentLoaded', checkAPIConnection);

// Basic Calculator API
async function calculateBasic(expression) {
    console.log('API BASE URL:', API_BASE_URL);
    console.log('API call to:', `${API_BASE_URL}/calculator/calculate`);
    console.log('Request body:', { expression });
    
    const response = await fetch(`${API_BASE_URL}/calculator/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
        const error = await response.json();
        console.error('API error:', error);
        throw new Error(error.detail || 'Calculation failed');
    }
    
    const result = await response.json();
    console.log('API result:', result);
    return result;
}

// Scientific Calculator API
async function calculateScientific(expression, isDegree = true) {
    const response = await fetch(`${API_BASE_URL}/scientific/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression, is_degree: isDegree }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

// Financial Calculator APIs
async function calculateLoan(principal, rate, term) {
    const response = await fetch(`${API_BASE_URL}/financial/loan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ principal, rate, term }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateInterest(principal, rate, time, type) {
    const response = await fetch(`${API_BASE_URL}/financial/interest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ principal, rate, time, type }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateMortgage(price, downPayment, rate, term) {
    const response = await fetch(`${API_BASE_URL}/financial/mortgage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, down_payment: downPayment, rate, term }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

async function calculateROI(initialInvestment, finalValue) {
    const response = await fetch(`${API_BASE_URL}/financial/roi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initial_investment: initialInvestment, final_value: finalValue }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Calculation failed');
    }
    
    return await response.json();
}

// History API
async function getHistory() {
    const response = await fetch(`${API_BASE_URL}/history/`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }
    
    return await response.json();
}

async function clearHistory() {
    const response = await fetch(`${API_BASE_URL}/history/`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to clear history');
    }
    
    return await response.json();
}
