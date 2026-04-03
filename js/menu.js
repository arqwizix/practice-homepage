document.addEventListener('DOMContentLoaded', function () {
    const burgers = document.querySelectorAll('.burger');

    burgers.forEach(function (burger) {
        burger.addEventListener('click', function () {
            const headerRight = burger.closest('.header-right');
            const menu = headerRight.querySelector('.main-nav');

            menu.classList.toggle('active');
        });
    });
});