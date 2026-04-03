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

            cart: [],

            contactFields: {
                name: '',
                companyName: '',
                position: '',
                city: '',
                country: '',
                telephone: '',
                email: '',
                who: 'seed producer',
                other: '',
                interest: '',
                code: ''
            },

            orderDone: false,
            orderedData: null
        },

        mounted: function () {
            this.getProduct();
            this.getCart();
            this.checkInCart();
        },

        methods: {
            getProduct: function () {
                if (!window.location.hash) {
                    return;
                }

                var id = Number(window.location.hash.replace('#', ''));

                for (var i = 0; i < this.products.length; i++) {
                    if (this.products[i].id === id) {
                        this.product = this.products[i];
                        break;
                    }
                }
            },

            addToCart: function (id) {
                var storedCart = [];

                if (window.localStorage.getItem('cart')) {
                    storedCart = window.localStorage.getItem('cart').split(',').filter(Boolean);
                }

                if (storedCart.indexOf(String(id)) === -1) {
                    storedCart.push(String(id));
                    window.localStorage.setItem('cart', storedCart.join(','));
                }

                this.btnVisible = 1;
                this.getCart();
            },

            checkInCart: function () {
                if (
                    this.product &&
                    window.localStorage.getItem('cart') &&
                    window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !== -1
                ) {
                    this.btnVisible = 1;
                } else {
                    this.btnVisible = 0;
                }
            },

            getCart: function () {
                this.cart = [];

                if (!window.localStorage.getItem('cart')) {
                    return;
                }

                var storedIds = window.localStorage.getItem('cart').split(',').filter(Boolean);

                for (var i = 0; i < storedIds.length; i++) {
                    var currentId = Number(storedIds[i]);

                    for (var j = 0; j < this.products.length; j++) {
                        if (this.products[j].id === currentId) {
                            this.cart.push(this.products[j]);
                            break;
                        }
                    }
                }
            },

            removeFromCart: function (id) {
                this.cart = this.cart.filter(function (item) {
                    return item.id !== id;
                });

                var newIds = this.cart.map(function (item) {
                    return String(item.id);
                });

                if (newIds.length) {
                    window.localStorage.setItem('cart', newIds.join(','));
                } else {
                    window.localStorage.removeItem('cart');
                }

                if (this.product && this.product.id === id) {
                    this.btnVisible = 0;
                }
            },

            makeOrder: function () {
                this.orderedData = {
                    name: this.contactFields.name,
                    companyName: this.contactFields.companyName,
                    position: this.contactFields.position,
                    city: this.contactFields.city,
                    country: this.contactFields.country,
                    telephone: this.contactFields.telephone,
                    email: this.contactFields.email,
                    who: this.contactFields.who,
                    other: this.contactFields.other,
                    interest: this.contactFields.interest,
                    code: this.contactFields.code
                };

                this.orderDone = true;
                this.cart = [];
                window.localStorage.removeItem('cart');

                this.contactFields = {
                    name: '',
                    companyName: '',
                    position: '',
                    city: '',
                    country: '',
                    telephone: '',
                    email: '',
                    who: 'seed producer',
                    other: '',
                    interest: '',
                    code: ''
                };
            }
        }
    });
});