// You need to implement an ATM algorithm for:
//
// Checking the card balance.
//     Withdrawing cash.
//     Input data:
//
//     let userData = {
//             'USD': 1000,
//             'EUR': 900,
//             'UAH': 15000,
//             'BIF': 20000,
//             'AOA': 100
//         },
//         bankData = {
//             'USD': {
//                 max: 3000,
//                 min: 100,
//                 img: '💵'
//             },
//             'EUR': {
//                 max: 1000,
//                 min: 50,
//                 img: '💶'
//             },
//             'UAH': {
//                 max: 0,
//                 min: 0,
//                 img: '💴'
//             },
//             'GBP': {
//                 max: 10000,
//                 min: 100,
//                 img: '💷'
//             }
//         }
// To implement the getMoney function:
//
//     It takes two input arguments, userData and bankData.
//     It returns a Promise. The condition to enter the first .then is the user's response to the question 'View card balance?'.
//     If the user chooses 'Yes' (Confirm), the function calls resolve(userData).
//     In the resolve function, depending on the currencies available to the user (userData), the user is asked to enter the currency for which the balance will be displayed.
//     If the user enters an invalid currency in the prompt, we continue to request a valid currency until a valid one is entered.
//     Upon entering a valid currency, the balance for that currency is displayed in the console, for example: 'Balance is: 1000 USD'.
//     If the user chooses 'Cancel' (No), the function calls reject({userData: userData, bankData: bankData}).
//     In the reject function, depending on the currencies available to the user (userData) and the available currencies in the current ATM (bankData) (with a non-zero max property indicating the absence of bills of that currency in the ATM at the moment), the user is asked to enter the currency and the amount to withdraw cash.
//     If the user enters an invalid currency or an amount exceeding the maximum amount for that currency, a message is displayed in the console: 'The entered amount is greater than the allowed maximum. Maximum withdrawal amount: ...'
// If the user enters an amount less than the minimum amount for that currency, a message is displayed in the console: 'The entered amount is less than the allowed minimum. Minimum withdrawal amount: ...'
// Upon entering a valid currency and amount, a message is displayed in the console indicating a successful cash withdrawal, for example: 'Here are your cash 200 USD 💵'.
//     The final message that the user should receive in the console regardless of the chosen operation is: 'Thank you, have a nice day 😊'

let userData = {
        'USD': 1000,
        'EUR': 900,
        'UAH': 15000,
        'BIF': 20000,
        'AOA': 100
    },
    bankData = {
        'USD': {
            max: 3000,
            min: 100,
            img: '💵'
        },
        'EUR': {
            max: 1000,
            min: 50,
            img: '💶'
        },
        'UAH': {
            max: 0,
            min: 0,
            img: '💴'
        },
        'GBP': {
            max: 10000,
            min: 100,
            img: '💷'
        }
    }

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
        let viewBalance = confirm('View card balance?');
        if (viewBalance) {
            resolve(userData);
        } else {
            reject({userData: userData, bankData: bankData});
        }
    })
        .then((userData) => {
            let currency = prompt('Введите название валюты в формате (USD, EUR, UAH, BIF, AOA):');
            while (!userData.hasOwnProperty(currency)) {
                currency = prompt('Введите допустимое название валюты в формате (USD, EUR, UAH, BIF, AOA):');
            }
            console.log(`Balance is: ${userData[currency]} ${currency}`);
        })
        .catch(({userData, bankData}) => {
            let currency = prompt('Введите валюту для снятия наличных (USD, EUR, UAH, BIF, AOA):');

            while (!userData.hasOwnProperty(currency) || (!bankData[currency] || bankData[currency].max === 0)) {
                currency = prompt('Введите допустимую валюту для снятия наличных (USD, EUR, UAH, BIF, AOA):');
            }

            if (!userData.hasOwnProperty(currency)) {
                alert('Недопустимая валюта для снятия наличных.');
                return;
            }

            if (!bankData[currency] || bankData[currency].max === 0) {
                alert(`Извините, в банкомате нет купюр валюты ${currency}`);
                return;
            }

            let amount = prompt(`Введите сумму для снятия (Макс: ${bankData[currency].max}, Мин: ${bankData[currency].min}):`);
            amount = parseFloat(amount);

            if (isNaN(amount)) {
                alert('Введено некорректное значение для суммы.');
                return;
            }

            if (amount > bankData[currency].max) {
                console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${bankData[currency].max}`);
                return;
            }

            if (amount < bankData[currency].min) {
                console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bankData[currency].min}`);
                return;
            }

            userData[currency] -= amount;
            console.log(`Вот ваши деньги: ${amount} ${currency} ${bankData[currency].img}`);
        })
        .finally(() => {
            console.log('Thank you, have a nice day 😊');
        });
}

getMoney(userData, bankData);