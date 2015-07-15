'use strict'

exports = module.exports = function(app,mongoose){
	var eventSchema = new mongoose.Schema({
	
		_id:{type:String},
		name:{type:String,required:true},
		description:{type:String},
		date:{type:Date},
		startTime:{type:String},
		endTime:{type:String},
		username:{type:String,required:true},
		venue:{type:String},
		search:[String]	
	});

  eventSchema.plugin(require('./plugins/pagedFind'));
  eventSchema.index({name:1});
  eventSchema.index({description:1});
  eventSchema.index({date:1});
  eventScehma.index({startTime:1});
 
  eventScehma.index({endTime:1});
  eventScehma.index({username:1});
  eventScehma.index({venue:1});
  eventScehma.index({search:1});
 
 
  eventSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Event', eventSchema);

};
