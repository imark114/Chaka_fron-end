const loadBrands=()=>{
    const parent = document.getElementById("brand_div")
    fetch("https://chaka-back-end.onrender.com/car/brand/")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(item=>{
        const p = document.createElement("p")
       p.innerHTML = `
       <button onclick="loadCars('${item.name}')" class="hover:text-[#e22937]">${item.name}</button>
       `
       
       parent.appendChild(p); 
        })    
    })
}

const loadCars=(search)=>{
    const parent = document.getElementById("car_div");
    parent.innerHTML="";
    fetch(`https://chaka-back-end.onrender.com/car/list/?search=${search?search:""}`)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(item=>{
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="card card-compact w-96 bg-base-100 shadow-xl rounded-md">
                        <figure><img src="${item.image}" alt="Car" /></figure>
                        <div class="card-body">
                          <small>${item.manufacture_date}</small>
                          <h2 class="card-title">${item.title}</h2>
                          <p><span class="text-[#28a745] text-lg font-semibold">$${item.price}</span> /MRP</p>
                          <p>${item.description}</p>
                          <hr class="w-full">
                            <div class="flex">
                               <p> <i class="fas fa-car mr-2 text-[#e22937]"></i> <span>${item.driving_mode}</span></p>
                               <p> <i class="fas fa-tachometer-alt mr-2 text-[#e22937]"></i><span>${item.speed}</span>KM/h</p>
                               <p> <i class="fas fa-gas-pump mr-2 text-[#e22937]"></i></i><span>Petrol</span></p>
                            </div>
                          <div class="card-actions justify-start mt-2">
                            <button onclick="handleAddToCart('${item.id}')" class="btn bg-[#052046] text-white w-full hover:bg-[#e22937]">Add to Cart</button>
                          </div>
                        </div>
                      </div>
            `
            parent.appendChild(div)
        })
    })
}

const handleUserBtn=()=>{
  const signup = document.getElementById("signup_btn")
    const profile = document.querySelector("#profile_btn")
    const user_id = localStorage.getItem('user_id')
      if (user_id === 'undefined' || user_id === null){
        profile?.classList.add("hide_btn");
        signup?.classList.remove("hide_btn");
        
      }
      else{
        signup?.classList.add("hide_btn");
        profile?.classList.remove("hide_btn");
      }
}

const handleAddToCart = (car_id)=>{
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  if (user_id === 'undefined' || user_id === null){
    window.location.href = "login.html";
 }
 else{
  const info = {
    "user": user_id,
    "car": car_id
  }
  fetch("https://chaka-back-end.onrender.com/borrow_car/cart/", {
    method: "POST",
    headers: { 
      'Authorization': `Token ${token}`,
      "Content-Type": "application/json"
     },
    body: JSON.stringify(info),
    
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status === "success"){
      alert(`${data.message}`);
    }
  })
 }
}

handleUserBtn();
loadBrands();
loadCars();