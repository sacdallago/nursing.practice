Template.registerHelper('niceDate', function(value){
    return moment(value).format("HH:mm DD/MM/YYYY");
});