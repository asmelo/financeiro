import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 5, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date
      format: 'dd/mm/yyyy',
      formatSubmit: 'mm-dd-yyyy',
      onSet: function(e) {
          this.send('selecionaData')(e);
      }
    });
  },

  actions: {
    selecionaData(value){
      this.get('selecionaData')(value);
    }
  }

});
