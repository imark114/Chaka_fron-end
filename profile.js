const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token');

const loadUserData = ()=>{
    const username = document.getElementById('username');
    const first_name =  document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const  eamail = document.getElementById('email')
    const avatar = document.getElementById('avatar');

    fetch("https://chaka-back-end.onrender.com/account/profile/",{
        headers:{
          'Authorization': `Token ${token}`,
        }
      })
      .then(res=>res.json())
      .then(data=>{
        username.value = data.username;
        first_name.value = data.first_name;
        last_name.value = data.last_name;
        eamail.value = data.email;
        console.log(data.image);
        if(data.image){
            avatar.src = data.image;
        }
        else {
            avatar.src = 'https://via.placeholder.com/96';
        }
        
      })
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
        const output = document.getElementById('avatar');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

window.onload = loadUserData;



const handleLogout=()=>{
    fetch("https://chaka-back-end.onrender.com/account/logout/",{
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status === 200){
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_role');
            window.location.href = "index.html";
        }
    })
    .catch(err => console.log(err))
}


async function updateProfile(data) {
    const response = await fetch('https://chaka-back-end.onrender.com/account/profile/', {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

document.getElementById('profileForm').onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedData = {};
    formData.forEach((value, key) => {
        if (value) {
            updatedData[key] = value;
        }
    });

    try {
        const result = await updateProfile(updatedData);
        console.log('Update successful:', result);
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

