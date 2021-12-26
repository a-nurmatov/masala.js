const body = document.querySelector('body');

function objectLength(obj) {return Object.keys(obj).length;}
function numberOfSolved(obj) {return Object.values(obj).filter((obj) => obj.solved).length};