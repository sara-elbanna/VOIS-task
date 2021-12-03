import fetch from 'isomorphic-fetch'

export function fetchProductsApi(){
    return fetch('http://localhost:3000/data.json')
}