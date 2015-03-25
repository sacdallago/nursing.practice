Router.configure({
            templateNameConverter : 'upperCamelCase',
            layoutTemplate: 'scheleton'
      });

Router.route('/', {
	loadingTemplate : 'loading',
	action : function() {
		this.render('home');
		this.render('navigation', {
            to: "navigation"
        });
	}
});

Router.route('/notes', {
	loadingTemplate : 'loading',
	waitOn : function() {
		return Meteor.subscribe('notes');
	},
	action : function() {
		this.render('notes');
		this.render('navigation', {
            to: "navigation"
        });
	}
});

Router.route('/notes/:_id', {
	loadingTemplate : 'loading',
	waitOn : function() {
		return Meteor.subscribe('notes', this.params._id);
	},
	data : function() {
		return Notes.findOne({
			_id : this.params._id
		});
	},
	action : function() {
		this.render('note');
		this.render('navigation', {
            to: "navigation"
        });
	}
});
