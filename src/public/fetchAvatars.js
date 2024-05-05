const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJwYXJlbnQiLCJjaGlsZCJdLCJuYW1lIjoiTWFyaWUiLCJpYXQiOjE3MTQ2NTI3ODQsImV4cCI6MTcxNDczOTE4NCwic3ViIjoibWFyaWVAaG9tZS5lZHUifQ.O0tzcA8o-z4TWqf4P-d4G1ZwHwePJThmllhi_OPd77A"

let currentPage = 1;

function fetchAvatarsPaged(page = 1, size = 2) {
    fetch(`/api/avatars?page=${page}&size=${size}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(avatars => {
            document.getElementById("avatars-table").innerHTML = "";

            avatars.forEach(avatar => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${avatar.avatarName}</td>
                    <td>${avatar.childAge}</td>
                    <td>${avatar.createdAt}</td>
                `
                document.getElementById("avatars-table").appendChild(tr)
            })
        })
        .catch(error => console.error(error))
}


fetchAvatarsPaged(currentPage)

function fetchNextPage(){
    currentPage++;

    fetchAvatarsPaged(currentPage)
}

function fetchPreviousPage(){
    currentPage--;

    fetchAvatarsPaged(currentPage)
}
