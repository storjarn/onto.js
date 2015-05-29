
    //===========================================================
    (function(){

        /**
         * TextBox Class constructor
         * @class  Onto.UI.TextBox
         * @classdesc Represents a text input HTML element in the Onto game UI
         * @param {object} data - The data that is going to be bound to this instance of TextBox
         * @return {Onto.UI.TextBox#}
         */
        var TextBox = new Class({
            isAbstract: false,
            inherits: Onto.UI.Base,
            init: function constructor(data) {
                var self = this;
                data = data || {};

                if (data.attributes && data.tagName) {
                    delete data.tagName;
                }

                constructor.super.call(self, data);
            },
            tagName: 'input',
            attributes: {
                type: 'text',
                value: ''
            }
        });

        Onto.UI.addClass("TextBox", TextBox);

    })();

