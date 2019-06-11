import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Route.extend({

  login: service(),
  alerta: service(),

  beforeModel() {
    if (!this.get('login').isLogado) {
      this.transitionTo('login');
      this.get('alerta').erro("Faça seu login!");
    }
  }

});
