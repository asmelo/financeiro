import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({

  login: service(),
  alerta: service(),

  actions: {
    signIn() {
      if (this.get('senha') == '0fCaridadeo1') {
        this.get('login').set('isLogado', true);
        this.transitionToRoute('portal.lancamento');
      } else {
        this.get('login').set('isLogado', false);
        this.get('alerta').erro("Senha incorreta");
      }
    }
  }

});
