export default {
    user: {
        getUser: () => 
          fetch(`http://127.0.0.1:8000/api/users/${localStorage.getItem('user_id')}/`,{
            method: 'get',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type':'application/json',
            },
          })
          .then(res => {
            if(res.status === 200){
              return res.json();
            }
            else return null;
          })
          .catch(e => {
              console.log(e);
          }),

        patchUser: body => 
          fetch(`http://127.0.0.1:8000/api/users/${localStorage.getItem('user_id')}/`,{
            method: 'PATCH',
            headers: {
              'Authorization': "JWT " + localStorage.getItem('access_token'),
            },
            body: body
          })
          .then(res =>res)
          .catch(e => {
              console.log(e);
          }),
        
          postUser: body => 
          fetch('http://127.0.0.1:8000/api/users/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: body
          })
          .then(res =>res)
          .catch(e => {
                console.log(e);
          })
          
    }
}