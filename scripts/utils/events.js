export default class Events {
  constructor() {
    /**
     * @type {object}
     * @private
     */
    this.listeners = {};
  }

  /**
   * Listen to event
   *
   * @param {string} type
   * @param {function} listener
   * @param {object} [scope]
   */
  on(type, listener, scope) {
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
  }

  /**
   * Fire event. If any of the listeners returns false, return false
   *
   * @param {string} type
   * @param {object} event
   *
   * @return {boolean}
   */
  fire(type, event) {
    const triggers = this.listeners[type] || [];

    return triggers.every(function(trigger) {
      return trigger.listener.call(trigger.scope || this, event) !== false;
    });
  }
}