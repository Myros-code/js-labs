const testModules = require('./test-module');
require('../css/app.css');

require('./vendors/jquery.min');
require('./vendors/owl.carousel.min');


/** ******** Your code here! *********** */

// Include my scss styles
require('../scss/style.scss');

console.log(testModules.hello);


$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
});
