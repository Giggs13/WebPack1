'use strict';

export default function (message) {

    if (PROFILE === 'development') {
        console.log('It\'s just a development');
    }
    alert(USER + `, welcome to the ${ message }!`);
};