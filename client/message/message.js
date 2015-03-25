Template.dimmedMessage.rendered = function() {
    var dimmer = this.$('.ui.page.dimmer').dimmer('show');
    Meteor.setTimeout(function(){
        dimmer.dimmer('hide');
    },this.data.timeout);
};

renderMessage = function(title, message, timeout){
    timeout = timeout ? timeout : 2500;
    var template = Blaze.renderWithData(Template.dimmedMessage, {timeout:timeout, title:title, message:message}, document.body);
    Meteor.setTimeout(function(){
        Blaze.remove(template);
    },timeout+1000);
};