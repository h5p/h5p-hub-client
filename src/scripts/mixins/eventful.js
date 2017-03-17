/**
 * @mixin
 */
export const Eventful = () => ({
  listeners: {},

  /**
   * Listen to event
   *
   * @param {string} type
   * @param {function} listener
   * @param {object} [scope]
   *
   * @function
   * @return {Eventful}
   */
  on: function(type, listener, scope) {
    /**
     * @typedef {object} Trigger
     * @property {function} listener
     * @property {object} scope
     */
    const trigger = {
      'listener': listener,
      'scope': scope
    };

    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(trigger);

    return this;
  },

  /**
   * Triggers event. If any of the listeners returns false, return false
   *
   * @param {string} type
   * @param {object} [event]
   *
   * @function
   * @return {boolean}
   */
  trigger: function(type, event) {
    const triggers = this.listeners[type] || [];

    return triggers.every(function(trigger) {
      return trigger.listener.call(trigger.scope || this, event) !== false;
    });
  },

  /**
   * Listens for events on another Eventful, and propagate it trough this Eventful
   *
   * @param {string[]} types
   * @param {Eventful} eventful
   * @param {String} [eventName] the name of the event when propogated
   */
  propagate: function(types, eventful, newType) {
    let self = this;
    types.forEach(type => eventful.on(type, event => self.trigger(newType || type, event)));
  }
});
