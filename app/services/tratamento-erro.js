import Ember from 'ember';

export default Ember.Service.extend({

  alerta: Ember.inject.service(),

  trataErro(erro) {
    let alerta = this.get('alerta');

    if(typeof erro === 'string') {
      alerta.erro(erro);
      return;
    }
    else if(typeof erro === 'object') {

      //varias mensagens
      if(Ember.isArray(erro.errors)) {

        //exibe todos os erros retornados
        erro.errors.forEach( erro => {
          let { status, detail } = erro;

          let msg = detail || 'Não foi possível identificar o erro';

          switch(status) {
            case "404":
              this.get('alerta').erro('Pagina não econtrada');
              break;
            default:
              this.get('alerta').erro(msg);
              break;
          }
        });
      } else {
          let msg = erro.message || erro.detail || 'Não foi possível identificar o erro';
          console.log(msg);
          this.get('alerta').erro(msg);
      }
    }
  }

});
