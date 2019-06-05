import Ember from 'ember';

export default Ember.Component.extend({

    actions: {

        actionConfirm() {
            this.get('actionConfirm')();
        }

    }

});
