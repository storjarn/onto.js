    /**
     * @namespace  Onto.UI
     */
    Onto.addNamespace(new Namespace("UI"));

    //===========================================================
    (function() {

        /**
         * Base Component Class constructor
         * @class  Onto.UI.Base
         * @classdesc Represents the base class for UI in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Base
         * @return {Onto.UI.Base}
         */
        var Base = new Class({
            isAbstract: true,
            inherits: Onto.Base,
            init: function constructor(data) {
                var self = this;
                data = data || {};

                constructor.super.call(self, data);

                var viewOptions = ['el', 'id', /*'attributes', */'className', 'tagName'];

                if (data.attributes && data.attributes.type) {
                    delete data.attributes.type;
                }
                data.attributes = _.extend(self.attributes || {}, data.attributes || {});
                data.events = data.events || {};

                _.extend(self, _.pick(data, viewOptions));
                this.ensureElement();

                self.$el.change(data.events.change || function() {});

                self.$el.val(data.attributes.value || '');
            },

            Value: function(val) {
                if (arguments.length) {
                    var oldValue = this.$el.val();
                    if (val && oldValue !== val.toString()) {
                        this.$el.val(val);
                        this.$el.change();
                    }
                    return this;
                } else {
                    return this.$el.val();
                }
            },

            ensureElement: function() {
                if (!this.el) {
                    var attrs = _.extend({}, _.result(this, 'attributes'));
                    if (this.id) attrs.id = _.result(this, 'id');
                    if (this.className) attrs['class'] = _.result(this, 'className');
                    this.setElement(this.createElement(_.result(this, 'tagName')));
                    this.setAttributes(attrs);
                } else {
                    this.setElement(_.result(this, 'el'));
                }
            },

            setAttributes: function(attributes) {
                this.$el.attr(attributes);
            },

            createElement: function(tagName) {
                return document.createElement(tagName);
            },

            setElement: function(el) {
                this.$el = el instanceof $ ? el : $(el);
                this.el = this.$el[0];
            }
        });

        Onto.UI.addClass("Base", Base);

    })();
