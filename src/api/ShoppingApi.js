export default {
    shoppingItems: {
        getShoppingItems: params => 
          fetch(`http://127.0.0.1:8000/api/shopping_list/?${params}`,{
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

        postShoppingItem: added => 
          fetch('http://127.0.0.1:8000/api/shopping_list/',{
            method: 'post',
            headers: {
              'Authorization': "JWT " + localStorage.getItem('access_token'),
              'Content-Type':'application/json'
            },
            body: added
          })
            .then(res =>res)
            .catch(e => {
                console.log(e);
            })
          
    }
}