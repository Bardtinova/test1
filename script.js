window.addEventListener("DOMContentLoaded", () => { 
    //работа с меню-гамбургером
     const menu = document.querySelector('.menu'),
           menuItem = document.querySelectorAll('.menu_link'),
           hamburger = document.querySelector('.hamburger'),
           nav = document.querySelector('.nav-container'),
           scrollSection = document.querySelectorAll('.scroll');
           
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
            nav.classList.toggle('nav-container_active');
         });    
        
        menu.addEventListener('click', (e) => {
            const target = e.target;
             if (target) {
                    menuItem.forEach((item, i) => {
                        item.classList.remove('menu_link_active');
                        if (target == item) {
                            item.classList.add('menu_link_active');
                        }
                   }) 
                }
        });
           
     //работа с get запросом 
    async function getResource(url) {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        } 
        return await res.json();
    }
    
    function createCards(data) { // создание карточки
        const card = document.createElement('div');
        card.classList.add('result_protect');
        card.innerHTML = `
            <h3 class='result_h3'>${data.name}</h3>
            <div>gender: ${data.gender}</div>
            <div>height: ${data.height}</div>    
            <div>person's weight: ${data.mass}</div>
            <div>hair color: ${data.hair_color}</div>
        `;
        document.querySelector('.app').append(card);
    } 

    //удаление кнопки и выводданных
    document.getElementById("resbtn").addEventListener("click", function () {
        getResource('https://swapi.dev/api/people/1/')
        .then(data => createCards(data))
        .catch(err => console.log(err));
       this.remove();
    }, {once: true}); 

    //работа со скроллом
 
function checkPosition() {
    const height = document.querySelector('.height').offsetHeight; //высота до футера
        const heightFooter = document.querySelector('.footer').offsetHeight; //высота футера
        const scrolled = window.scrollY; // сколько пользователь проскроллил
        const threshold = height - heightFooter/2; //определение порога
        const position = scrolled + heightFooter; //отслеживание, где находится низ экрана
        if (position >= threshold) {
            scrollSection.forEach(item => {
                item.style.display= 'block';
            })
        }
}
(() => {
          window.addEventListener('scroll', checkPosition)
          window.addEventListener('resize', checkPosition)  
        })()
    
})

