import wrapFetch from './wrap-fetch';

export default () => wrapFetch('/session', {
  method: 'POST',
});
