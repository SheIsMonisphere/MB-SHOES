import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [
      {
        id: 1,
        title: 'Jimmy Basket',
        price: 760,
        img: '/images/sneakers-1.jpg',
        colors: ['green', 'white'],
      },
      {
        id: 2,
        title: 'Nike Air Max',
        price: 850,
        img: '/images/sneakers-2.jpg',
        colors: ['white', 'black', 'orange'],
      },
      {
        id: 3,
        title: 'Adidas Ultraboost',
        price: 900,
        img: '/images/sneakers-3.jpg',
        colors: ['white', 'beige'],
      },
      {
        id: 4,
        title: 'Puma RS-X',
        price: 700,
        img: '/images/sneakers-4.jpg',
        colors: ['blue', 'pink', 'yellow', 'black'],
      },
      {
        id: 5,
        title: 'New Balance 574',
        price: 650,
        img: '/images/sneakers-5.jpg',
        colors: ['yellow', 'white'],
      },
      {
        id: 6,
        title: 'Converse Chuck Taylor',
        price: 550,
        img: '/images/sneakers-6.jpg',
        colors: ['black', 'white'],
      },
      {
        id: 7,
        title: 'Vans Old Skool',
        price: 600,
        img: '/images/sneakers-7.jpg',
        colors: ['black', 'red', 'white'],
      },
      {
        id: 8,
        title: 'Reebok Classic',
        price: 620,
        img: '/images/sneakers-8.jpg',
        colors: ['black', 'blue', 'yellow'],
      },
      {
        id: 9,
        title: 'Asics Gel-Kayano',
        price: 800,
        img: '/images/sneakers-9.jpg',
        colors: ['teal', 'yellow', 'white'],
      },
      {
        id: 10,
        title: 'Saucony Jazz',
        price: 680,
        img: '/images/sneakers-10.jpg',
        colors: ['neon green', 'white'],
      },
      {
        id: 11,
        title: 'On Cloudstratus',
        price: 950,
        img: '/images/sneakers-11.jpg',
        colors: ['gray', 'black'],
      },
      {
        id: 12,
        title: 'Hoka Bondi',
        price: 890,
        img: '/images/sneakers-12.jpg',
        colors: ['red', 'white'],
      },
    ],
    cart: [],
    favorites: [],
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(
        (item) => item.id === product.id && item.size === product.size
      )
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, { id, size }) {
      state.cart = state.cart.filter(
        (item) => !(item.id === id && item.size === size)
      )
    },
    updateCartItemQuantity(state, { id, size, quantity }) {
      const item = state.cart.find(
        (item) => item.id === id && item.size === size
      )
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(
            (cartItem) => !(cartItem.id === id && cartItem.size === size)
          )
        }
      }
    },
    updateCartItemSize(state, { id, oldSize, newSize }) {
      const item = state.cart.find(
        (item) => item.id === id && item.size === oldSize
      )
      if (item) {
        item.size = newSize
      }
    },
    toggleFavorite(state, productId) {
      const index = state.favorites.indexOf(productId)
      if (index === -1) {
        state.favorites.push(productId)
      } else {
        state.favorites.splice(index, 1)
      }
    },
    setProducts(state, products) {
      state.products = products
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites
    },
    clearCart(state) {
      state.cart = []
    },
    setOrderDetails(state, orderDetails) {
      state.orderDetails = orderDetails
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, payload) {
      commit('removeFromCart', payload)
    },
    updateCartItemQuantity({ commit }, payload) {
      commit('updateCartItemQuantity', payload)
    },
    updateCartItemSize({ commit }, payload) {
      commit('updateCartItemSize', payload)
    },
    toggleFavorite({ state, commit }, productId) {
      const favorites = [...state.favorites]
      const index = favorites.indexOf(productId)
      if (index === -1) {
        favorites.push(productId)
      } else {
        favorites.splice(index, 1)
      }
      commit('SET_FAVORITES', favorites)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
    loadFavorites({ commit }) {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        commit('SET_FAVORITES', JSON.parse(savedFavorites))
      }
    },
    fetchProducts({ commit }) {
      // Simulate an API request
      setTimeout(() => {
        commit('setProducts', this.state.products)
      }, 1000)
    },
    clearCart({ commit }) {
      commit('clearCart')
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    isFavorite: (state) => (productId) => {
      return state.favorites.includes(productId)
    },
  },
})
