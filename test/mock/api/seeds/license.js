const chance = require('chance').Chance();

const licenses = {
  mit: 'The <b>MIT</b> license details comes here',
  cc: 'The <b>CC</b> license details comes here',
  ocl: 'The <b>OCL</b> license details comes here',
  opl: 'The <b>OPL</b> license details comes here',
  gfdl: 'The <b>GFDL</b> license details comes here'
}

const get = function(params, noResults) {

  // Generate some paragraphs
  const numParaghraphs = Math.ceil(Math.random() + 2) * 4;
  let output = '<p>' + licenses[params.id] + '</p>';
  for (let i = 0; i < numParaghraphs; i++) {
    output += '<p>' + chance.paragraph() + '<p>';
  }

  return noResults ? null : output;
};

export default get;