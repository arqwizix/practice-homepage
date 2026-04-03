document.addEventListener('DOMContentLoaded', function () {
    const appElement = document.getElementById('app');

    if (!appElement) {
        return;
    }

    new Vue({
        el: '#app',
        data: {
            products: [
                {
                    id: 1100,
                    title: 'TAG 1100 (TAG 901)',
                    short_text: 'Eggplant Standard Dark Purple Long',
                    image: 'eggplant-1100.jpg',
                    desc: 'Standard dark purple long eggplant with uniform shape, glossy skin, strong plant vigor and reliable field performance.'
                },
                {
                    id: 1101,
                    title: 'TAG 1101 (TAG 902)',
                    short_text: 'Eggplant Glossy Purple Classic Oval',
                    image: 'eggplant-1101.jpg',
                    desc: 'Glossy purple classic oval eggplant with attractive appearance, smooth texture and stable productivity in growing season.'
                },
                {
                    id: 1102,
                    title: 'TAG 1102 (TAG 903)',
                    short_text: 'Eggplant Deep Purple Garden Fresh',
                    image: 'eggplant-1102.jpg',
                    desc: 'Deep purple garden fresh eggplant with rich color, good firmness and balanced fruit development for fresh market use.'
                },
                {
                    id: 1103,
                    title: 'TAG 1103 (TAG 904)',
                    short_text: 'Eggplant Midnight Purple Compact',
                    image: 'eggplant-1103.jpg',
                    desc: 'Midnight purple compact eggplant with dense fruit set, neat plant habit and strong decorative deep-colored skin.'
                },
                {
                    id: 1104,
                    title: 'TAG 1104 (TAG 905)',
                    short_text: 'Eggplant Lavender Stripe Oval',
                    image: 'eggplant-1104.jpg',
                    desc: 'Lavender stripe oval eggplant with unusual color tone, attractive shape and fresh market appeal for premium presentation.'
                }
            ],
            product: null,
            btnVisible: 0,
            cartProducts: []
        },
        mounted: function () {
            this.getProduct();
            this.checkInCart();
            this.getCartProducts();
        },
        methods: {
            getProduct: function () {
                if (window.location.hash) {
                    var id = Number(window.location.hash.replace('#', ''));

                    for (var i = 0; i < this.products.length; i++) {
                        if (this.products[i].id === id) {
                            this.product = this.products[i];
                            break;
                        }
                    }
                }
            },

            addToCart: function (id) {
                var cart = [];

                if (window.localStorage.getItem('cart')) {
                    cart = window.localStorage.getItem('cart').split(',');
                }

                if (cart.indexOf(String(id)) === -1) {
                    cart.push(String(id));
                    window.localStorage.setItem('cart', cart.join(','));
                    this.btnVisible = 1;
                }
            },

            checkInCart: function () {
                if (
                    this.product &&
                    window.localStorage.getItem('cart') &&
                    window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !== -1
                ) {
                    this.btnVisible = 1;
                }
            },

            getCartProducts: function () {
                this.cartProducts = [];

                if (!window.localStorage.getItem('cart')) {
                    return;
                }

                var cart = window.localStorage.getItem('cart').split(',');

                for (var i = 0; i < this.products.length; i++) {
                    if (cart.indexOf(String(this.products[i].id)) !== -1) {
                        this.cartProducts.push(this.products[i]);
                    }
                }
            }
        }
    });
});