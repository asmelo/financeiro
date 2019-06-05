import Ember from 'ember';

export default Ember.Component.extend({

    active: Ember.computed.notEmpty('value'),

    mask: {
        money: function() {
           var el = this
           ,exec = function(v) {
              v = v.replace(/\D/g,"");
              v = new String(Number(v));
              var len = v.length;
              if (1== len)
                 v = v.replace(/(\d)/,"0,0$1");
              else if (2 == len)
                 v = v.replace(/(\d)/,"0,$1");
              else if (len > 2) {
                 v = v.replace(/(\d{2})$/,',$1');
                 if (len > 5) {
                    var x = len - 5
                    ,er = new RegExp('(\\d{'+x+'})(\\d)');
                    v = v.replace(er,'$1.$2');
                 }
                 if (len > 8) {
                    var x = len - 8
                    ,er = new RegExp('(\\d{'+x+'})(\\d)');
                    v = v.replace(er,'$1.$2');
                 }
                 if (len > 11) {
                    var x = len - 11
                    ,er = new RegExp('(\\d{'+x+'})(\\d)');
                    v = v.replace(er,'$1.$2');
                 }
              }
              return 'R$ ' + v;
           };
           setTimeout(function(){
              el.value = exec(el.value);
           },1);
        }
     },

    didInsertElement() {
	    this._super(...arguments);

        let inputId = this.$('input').attr('id');
            this.$('label').attr('for', inputId);

        if(!Ember.isEmpty(this.get('value'))) {
            this.$('label').addClass('active');
            if(this.$('input').attr('disabled')!='disabled'){
                this.$('i').addClass('active');
            }
        }

        this.$('input').bind('keypress',this.get('mask.money'));

    },

    actions: {
        focusOut(){
            let focusOut = this.get('focus-out');

            if(Ember.isPresent(focusOut)) {
              focusOut();
            } else {

              if(Ember.isPresent(this.get('constraint'))){
                let constraint = this.get('constraint') || {};

                let name = this.get('nomeCampo') || 'value';

                let value = this.get('value');

                let errors = validate({ [name]: value }, { [name]: constraint });

                if(errors) {
                  let erro = errors[name][0] || '';

                  this.set('erro', erro);
                }else{
                  this.set('erro', '');
                }
              }
            }
        }
    }
});
