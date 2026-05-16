const buttons = document.querySelectorAll('.button');
const currentButton = document.querySelector('.selectedpage');
const navMenu = document.querySelector('.nav-panel');
const backButton = document.getElementById('back');

// Tracks the mouse and sets a radial gradient on the mouse's position for all elements with the .button CSS class.
document.addEventListener('mousemove', (e) =>
{
    buttons.forEach(button =>
    {
        const rect = button.getBoundingClientRect();
        const xPer = ((e.clientX - rect.left) / rect.width * 100);
        const yPer = ((e.clientY - rect.top) / rect.height * 100);

        button.style.setProperty('--light-x', `${xPer}%`);
        button.style.setProperty('--light-y', `${yPer}%`);
        button.style.setProperty('--light-opacity', 0.08);
    });
});

buttons.forEach(button =>
{
    button.addEventListener('mousedown', () =>
    {
        button.classList.remove('click-animate');
        void button.offsetWidth;
        button.classList.add('click-animate');
    });
});

window.addEventListener('DOMContentLoaded', () =>
{
    const selectedButton = document.querySelector('.button.selectedpage');
    selectedButton.classList.add('animate');
})

function openNav()
{
    navMenu.classList.remove('closing');
    navMenu.classList.add('open');
    backButton.style.display = 'block';
}
function closeNav()
{
    navMenu.classList.add('closing');
    navMenu.classList.remove('open');

    setTimeout(() => {
        backButton.style.display = 'none';
        navMenu.classList.remove('closing')
    }, 400);
}

function setSelected(element)
{
    currentButton.classList.remove('selectedpage');
    element.classList.add('selectedpage');
}