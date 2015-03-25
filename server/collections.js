var Notes = new Meteor.Collection('notes');

Meteor.publish('notes', function(id) {
	if (id) {
		return Notes.find({
			_id : id
		});
	} else {
		return Notes.find();
	}
});

Meteor.publish('notesIndicator', function(id) {
	return Notes.find({}, {
		fields : {
			_id: 1
		}
	});
});
