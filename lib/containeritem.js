
    //===========================================================
    (function(){

        /**
         * ContainerItem Class constructor
         * @class  Onto.ContainerItem
         * @classdesc Represents a container item in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of ContainerItem
         * @return {Onto.ContainerItem}
         * @extends {Onto.Item}
         * @inheritdoc Onto.Item
         * @see Onto.Inventory
         */
        var ContainerItem = new Class({
            inherits: Onto.Item,
            isAbstract: true,
            init: function constructor(data) {
                var self = this;
                data = data || {};
                constructor.super.call(self, data);
                data = self.parse(data);
            },

            Capacity: {
                get: function() {
                    var self = this;
                    var ret = {
                        Current: 0,
                        Maximum: self.Size
                    };
                    for(var i = 0; i < self.Container.length; ++i) {
                        ret.Current += self.Container[i].Size;
                    }
                    return ret;
                }
            },

            insertItem: {
                value : function(item) {
                    var self = this;
                    var capacity = self.Capacity;
                    if (item.UniqueID && capacity.Current + item.Size <= self.Size) {
                        this.Container.push(item);
                        this.Index[item.UniqueID] = item;
                    }
                }
            },

            removeItem: {
                value : function(item) {
                    var ret = [];
                    this.find(item, function(item, index, self){
                        ret.push(self.Container.splice(index, 1)[0]);
                    });
                    return ret;
                }
            },

            find: {
                value: function(itemType, callback) {
                    var ret = [];
                    var self = this;
                    callback = callback || null;
                    if (self.Index[itemType]) {
                        ret.push(self.Index[itemType]);
                    } else {
                        for(var i = 0; i < this.Container.length; ++i) {
                            var item = this.Container[i];
                            if (
                                (item.hasOwnProperty('FullyQualifiedName') && item.FullyQualifiedName == itemType)
                                || (item instanceof itemType)
                                || (item === itemType)
                               )
                            {
                                if (!!callback) {
                                    callback(item, index, self);
                                } else {
                                    ret.push({Item: item, Index: i});
                                }
                            }
                            ++index;
                        }
                    }
                    return ret;
                }
            },

            /**
             * @member {Onto.ContainerItem} ParentContainer - The container of this container.  Can be null
             * @instance
             * @memberof Onto.ContainerItem
             */
            ParentContainer: Class(null).Writable(),

            /**
             * @member {object} Container - The containing property of this container.  Can be null
             * @instance
             * @memberof Onto.ContainerItem
             */
            Container: Class(new Collection()),

            /**
             * @member {object} Index - The indexing property of this container.  Provides a constant-time lookup to items in the Container.
             * @instance
             * @memberof Onto.ContainerItem
             */
            Index: Class({})
        });

        Onto.addClass("ContainerItem", ContainerItem);

    })();
