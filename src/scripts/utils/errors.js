/**
 * @param  {string}   config.type         type of the message: info, success, error
 * @param  {boolean}  config.dismissible  whether the message can be dismissed
 * @param  {string}   config.content      message content usually a 'h3' and a 'p'
 * @return {el}       div containing the message element
 */
export const renderMessage = function(config) {

  const closeButton = document.createElement('div');
  closeButton.className = 'close';
  closeButton.innerHTML = '&#x2715';

  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = config.content;

  const messageWrapper = document.createElement('div');
  messageWrapper.className = 'message' + ' ' + `${config.type}` + (config.dismissible ? ' dismissible' : '');
  messageWrapper.appendChild(closeButton);
  messageWrapper.appendChild(messageContent);

  return messageWrapper;
}
