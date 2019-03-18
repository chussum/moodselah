const getVersion = () => {
  const agent = navigator.userAgent.toLowerCase();
  let word;
  if (navigator.appName === 'Microsoft Internet Explorer') {
    // IE old version ( IE 10 or Lower )
    word = 'msie ';
  } else if (agent.search('trident') > -1) {
    // IE 11
    word = 'trident/.*rv:';
  } else if (agent.search('edge/') > -1) {
    // Microsoft Edge
    word = 'edge/';
  } else {
    // 그외, IE가 아니라면 ( If it's not IE or Edge )
    return -1;
  }
  const reg = new RegExp(`${word}([0-9]{1,})(\\.{0,}[0-9]{0,1})`);
  if (reg.exec(agent) != null) return parseFloat(RegExp.$1 + RegExp.$2);
  return -1;
};

export default {
  getVersion
};
