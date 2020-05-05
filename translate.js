const translate = require('@vitalets/google-translate-api');

translate('I speak Spanish', {from: 'en', to: 'es'}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});