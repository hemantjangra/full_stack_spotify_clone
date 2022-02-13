export default function fetcher(url: string, data= {}): Promise<any>{
  return fetch(`${window.location.origin}/api/${url}`, {
    method : data ? 'POST' : 'GET',
    headers:{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data)
  }).then((res) => {
    return res.json();
  })
};