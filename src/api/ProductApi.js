export default {
    products: {
        getProducts: (owner, page) => 
          fetch(`http://127.0.0.1:8000/api/products/?owner=${owner}${page}`,{
            method: 'get',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type':'application/json',
            },
          })
          .then(res => res.json())
          .catch(e => {
              console.log(e);
          }),
        
        getSingleProduct: id => 
          fetch(`http://127.0.0.1:8000/api/products/${id}`,{
            method: 'get',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type':'application/json',
            },
          })
          .then(res => res.json())
          .catch(e => {
              console.log(e);
          }),

        postProduct: added => 
          fetch('http://127.0.0.1:8000/api/products/',{
            method: 'post',
            headers: {
              'Authorization': "JWT " + localStorage.getItem('access_token'),
            },
            body: added
          })
            .then(res =>res)
            .catch(e => {
                console.log(e);
            })
          
    }
}