export default{
    token: {
        obtain: body =>
            fetch('http://127.0.0.1:8000/api/obtain-token',{
                method: 'post',
                headers: {
                    'Content-Type':'application/json',
                },
                body: body
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

        refresh: body =>
            fetch('http://127.0.0.1:8000/api/refresh-token',{
                method: 'post',
                headers: {
                    'Content-Type':'application/json',
                },
                body: body
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

    }
}