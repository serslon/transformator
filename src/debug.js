import debug from 'debug';

export default nameModule => {
  if (!nameModule) {
    throw new Error('The name component is required.');
  }
  return debug(`Transformer:${nameModule}`);
};
