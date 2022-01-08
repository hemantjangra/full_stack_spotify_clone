export const fetcher = (url: string, data= {}): Promise<any> =>{
  return fetch(`${window.location.origin}/api/${url}`, {
    method : data ? 'POST' : 'GET',
    headers:{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data)
  });
};