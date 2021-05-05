export default {
    plannedMeals: {
        getPlannedMeals: params => 
          fetch(`http://127.0.0.1:8000/api/daily_meals/?${params}`,{
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

        postPlannedMeal: added => 
          fetch('http://127.0.0.1:8000/api/daily_meals/',{
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