window.onload = function() {
    function btnAddFavOnClick() {
        
    }

    const tableFavourites = document.getElementById('tableFavourites')

    document
        .querySelectorAll('.divAddFav')
        .forEach(div => {
            const btn = div.querySelector('.btn')
            const txtLeague = div.querySelector('.txtLeague')
            const txtCaption = div.querySelector('.txtCaption')
            btn.addEventListener('click', () => {
                const data =  `league=${txtLeague.value}&caption=${txtCaption.value}`
                httpRequest('POST', '/favourites', data, (err, body) => {
                    if (err) return alert(err)
                    tableFavourites.innerHTML += body
                })
            })
        })

    function httpRequest(method, path, data, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, path, true)
        
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE) {
                if(xhr.status == 200)
                    cb(null, xhr.responseText)
                else 
                    cb(new Error(xhr.status + ': ' + xhr.responseText))
            }
        }
        xhr.send(data); 
    }
}