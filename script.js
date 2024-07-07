window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

function dragElement(terrariumElement) {
    // set 4 positions for positioning on the screen
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    terrariumElement.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        terrariumElement.style.top = (terrariumElement.offsetTop - pos2) + 'px';
        terrariumElement.style.left = (terrariumElement.offsetLeft - pos1) + 'px';

        const terrarium = document.getElementById('terrarium');
        const terrariumRect = terrarium.getBoundingClientRect();
        const elementRect = terrariumElement.getBoundingClientRect();

        if (elementRect.top >= terrariumRect.top &&
            elementRect.left >= terrariumRect.left &&
            elementRect.bottom <= terrariumRect.bottom &&
            elementRect.right <= terrariumRect.right) {
            terrariumElement.classList.add('in-jar');
        } else {
            terrariumElement.classList.remove('in-jar');
        }
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

document.querySelectorAll('.plant').forEach(dragElement);

// Function to create and append particles
function createParticles() {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(particle);
    }
}

createParticles();

// Function to change dirt color
document.getElementById('changeDirtColor').addEventListener('click', () => {
    const dirt = document.querySelector('.dirt');
    dirt.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
});

// Function to reset all images
document.getElementById('resetImages').addEventListener('click', () => {
    document.querySelectorAll('.plant').forEach(plant => {
        plant.style.top = '';
        plant.style.left = '';
    });
});