const toString = (o: any) => Object.prototype.toString.call(o).replace(/\[object (?<t>\w+)\]/, '$<t>');

export default (o: any): string => {
  const type = toString(o);

  if (/^HTML([a-zA-Z]+)?Element$/.test(type)) {
    return 'HTMLElement';
  }

  if (type === 'Number' && isNaN(o)) {
    return 'NaN';
  }

  return type;
};
