export default class PanelView {
  constructor({title, contentEl}) {

    const logoEl = document.createElement('div');
    logoEl.className += 'hub-logo';
    logoEl.innerHTML += 'H5P Hub';

    const titleEl = document.createElement('div');
    titleEl.className += 'panel-title';
    titleEl.innerHTML += '<p>' + title + '</p>';

    const downArrowEl = document.createElement('div');
    downArrowEl.className += 'down-arrow';
    downArrowEl.innerHTML += '<span>v</span>'

    const headerEl = document.createElement('div');
    headerEl.className += 'hub-panel-header';
    headerEl.setAttribute('aria-expanded', false);
    headerEl.setAttribute('aria-controls', 'hub-panel-body');
    headerEl.addEventListener('click', function(event) {
      bodyEl.classList.toggle('hidden');
    })
    headerEl.appendChild(logoEl);
    headerEl.appendChild(titleEl);
    headerEl.appendChild(downArrowEl);

    const bodyEl = document.createElement('div');
    bodyEl.className += 'hub-body';
    bodyEl.className += ' hidden';
    bodyEl.id += 'hub-body';
    bodyEl.innerHTML = '<span>Body Text</span>';

    // Compose the panel
    const panelEl = document.createElement('div');
    panelEl.className += 'hub-panel';
    panelEl.appendChild(headerEl);
    panelEl.appendChild(bodyEl);
    this.panelEl = panelEl;
  }

  get() {
    return this.panelEl;
  }
}