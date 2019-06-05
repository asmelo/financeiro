import DS from 'ember-data';

export default DS.Model.extend({

  descricao:        DS.attr('string'),
  categoria:        DS.attr('number')  

});
