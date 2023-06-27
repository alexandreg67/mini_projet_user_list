const card = document.querySelector(".card");
const userList = document.querySelector(".userList");
const btnSuivant = document.querySelector(".btnSuivant")
const btnPrecedent = document.querySelector(".btnPrecedent")
const pageNumber = document.querySelector(".pageNumber")

let page = 1;

const getData = async () => {
    const reponse = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await reponse.json();
    console.log(data);
    if (page >= data.total_pages) {
        btnSuivant.style.display = "none"
    }else {
        btnSuivant.style.display = "flex"
    }
    if (page <= 1) {
        btnPrecedent.style.display = "none"
    } else {
        btnPrecedent.style.display = "flex"
    }

    for (const user of data.data) {
        // console.log(user);
        // console.log(user.email);
        let newLi = document.createElement("li");
        newLi.classList.add("cardUser")

        newLi.innerHTML += `
            <img class="userImg" src=${user.avatar}>
            <div class="userInfo">
            <p><span class="firstName">${user.first_name}</span><span class="lastName">${user.last_name}</span></p>
            <p>${user.email}</p>
            </div>
         `
        userList.appendChild(newLi);
        pageNumber.textContent = `${data.page}/${data.total_pages}`
    }
    
}

btnSuivant.addEventListener('click', () => {
    page++
    userList.innerHTML = ""
    getData() 
})
btnPrecedent.addEventListener('click', () => {
    page--
    userList.innerHTML = ""
    getData() 
})

window.addEventListener("load", () => {
    getData();
})
