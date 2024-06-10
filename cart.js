const loadCart=()=>{
    const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const span = document.getElementById("cart_count");
  const parent = document.getElementById("car_div");
    fetch(`https://chaka-back-end.onrender.com/borrow_car/cart/?user_id=${user_id}`,{
        headers: { 
            'Authorization': `Token ${token}`,
            "Content-Type": "application/json"
           },
    })
    .then(res=>res.json())
    .then(data=> {
        data.length > 0 ? span.innerText = data.length : span.innerText = "0";
        data.forEach(item=>{
            const div = document.createElement("div");
            fetch(`https://chaka-back-end.onrender.com/car/list/${item.car}/`)
            .then(rs=> rs.json())
            .then(dt=>{
                div.innerHTML = `
                <div class="card card-compact w-96 bg-base-100 shadow-xl rounded-md">
                        <figure><img src="${dt.image}" alt="Car" /></figure>
                        <div class="card-body">
                          <small>${dt.manufacture_date}</small>
                          <h2 class="card-title">${dt.title}</h2>
                          <p><span class="text-[#28a745] text-lg font-semibold">$${dt.price}</span> /MRP</p>
                          <p>${dt.description}</p>
                          <hr class="w-full">
                            <div class="flex">
                               <p> <i class="fas fa-car mr-2 text-[#e22937]"></i> <span>${dt.driving_mode}</span></p>
                               <p> <i class="fas fa-tachometer-alt mr-2 text-[#e22937]"></i><span>${dt.speed}</span>KM/h</p>
                               <p> <i class="fas fa-gas-pump mr-2 text-[#e22937]"></i></i><span>Petrol</span></p>
                            </div>
                            <div class="card-actions justify-start mt-2">
                            <button onclick="handleDeleteCart('${item.id}')" class="btn bg-[#e22937] text-white w-full hover:bg-[#052046]">Remove from Cart</button>
                          </div>
                        </div>
                      </div>
                `
                parent.appendChild(div);
            })
        })
    })
}


const handleDeleteCart = (cart_id)=>{
    const token = localStorage.getItem('token');
    fetch(`https://chaka-back-end.onrender.com/borrow_car/cart/${cart_id}/`,{
        method: 'DELETE',
        headers: { 
            'Authorization': `Token ${token}`,
            "Content-Type": "application/json"
           },
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status==="success"){
            alert(`${data.message}`)
            window.location.reload;
        }
    })
}

loadCart();