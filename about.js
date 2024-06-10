function countUp() {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count <= 2150) {
        document.getElementById("count_customer").innerText = count;
        count++;
      } else {
        clearInterval(intervalId);
      }
    }, 5);
  }
  
  countUp();
  