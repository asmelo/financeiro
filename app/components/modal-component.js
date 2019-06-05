import Ember from 'ember';

export default Ember.Component.extend({

  header: {isHeader: true},

  content: {isContent: true},

  footer: {isFooter: true},

  dismissible: true,

  opened: false,

  grupo: false,

  /**
   * Define se a modal se o componente sera renderizado em seu local ou utilizara o ember-wormhole
   */
  renderInPlace: true,

  /**
   * Percentual de distancia do topo da pagina
   */
  top: null,

  openedChanged: Ember.observer('opened', function(){
    let modal = this.$('.modal');
    let opened = this.get('opened');
    if(Ember.isPresent(modal)) {

      if(opened) {
        modal.modal('open');
      } else {
        modal.modal('close');
      }
    }
  } ),
  /**
   * Percentual de distancia do final da pagina
   */
  ending: null,

  didClose() {
    if(Ember.isPresent('closeAction')){
      this.get('closeAction')();
    }
  },

  willDestroy() {

    let modal = this.$('.modal');
    if(Ember.isPresent(modal)) {

      this.$('.modal').modal('close');
    }
  },

  didInsertElement() {

    let { dismissible, top, ending } = this.getProperties('dismissible', 'top', 'ending');


    let options = {
      dismissible,
      complete: () => {
        if(this.get('opened')) {
          this.set('opened', false);
        }
      },
    };

    if(!Ember.isEmpty(top)) {
      options['startingTop'] = `${top}%`;
    }

    if(!Ember.isEmpty(ending)) {

      options['endingTop'] =  `${ending}%`;
    }

    this.$('.modal').modal(options);

    if(this.get('opened')) {
      this.$('.modal').modal('open');
    }
  },
});
