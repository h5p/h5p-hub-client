/**
 * @mixin
 */
export const EventDispatcher = () => ({
  listeners: {},

  /**
   * Listen to event
   *
   * @param {string} type
   * @param {function} listener
   * @param {object} [scope]
   *
   * @function
   * @return {EventDispatcher}
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
   * Listens for events on another EventDispatcher, and propagate it trough this EventDispatcher
   *
   * @param {string[]} types
   * @param {EventDispatcher} dispatcher
   * @param {String} [eventName] the name of the event when propogated
   */
  propagate: function(types, dispatcher, newType) {
    let self = this;
    types.forEach(type => dispatcher.on(type, event => self.trigger(newType || type, event)));
  }
});
