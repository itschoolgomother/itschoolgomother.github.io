async function showSanta() {
    let img = document.getElementById('santa');
    img.style.visibility = 'visible';
    await sleep(1000);
    img.className = "big";
    await sleep(2000);

    let div = document.getElementById('letter');
    div.style.visibility = 'hidden';

    img.className = "";    
    await sleep(1000);
    img.style.visibility = 'hidden';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }