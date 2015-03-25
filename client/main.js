Notes = new Meteor.Collection('notes');
Meteor.subscribe('notesIndicator');

Session.setDefault('totalNotes', "<<fetching...>>");

Template.home.helpers({
	'total' : function() {
		return Notes.find().count();
	}
});

Template.notes.helpers({
	'notes' : function() {
		return Notes.find({},{
			sort: {
				timestamp: -1
			}
		});
	}
});

Template.navigation.events({
	'click .newNote' : function() {
		var template = Blaze.render(Template.newNote, document.body);
	}
});

Template.note.events({
	'click .ui.negative.button' : function() {
		Notes.remove({_id:this._id},function(error){
			if (error) {
					renderMessage('Something went wrong', 'Your note has NOT been removed', 4000);
				} else {
					renderMessage('Confirmation', 'Your note has been removed', 4000);
					Router.go('/notes');
				}
		});
	}
});

Template.newNote.rendered = function() {

	this.$('.ui.form').form({
		title : {
			identifier : 'title',
			rules : [{
				type : 'empty',
				prompt : 'Please enter a title'
			}]
		},
		note : {
			identifier : 'note',
			rules : [{
				type : 'empty',
				prompt : 'Please enter some text in the note'
			}]
		}
	}, {
		onSuccess : function(event) {
			var newnote = {
				title : title.value,
				note : note.value,
				timestamp : new Date()
			};
			Notes.insert(newnote, function(error) {
				if (error) {
					renderMessage('Something went wrong', 'Your note has NOT been saved', 4000);
				} else {
					renderMessage('Confirmation', 'Your note has been saved', 4000);
					$('.ui.modal').modal('hide');
				}
			});
		}
	});

	this.$('.ui.modal')
	.modal('setting', {
		onHidden : function() {
			this.remove();
		}
	})
	.modal('show');
};

