document.addEventListener("alpine:init", () => {
  Alpine.data("wishlists", () => ({
    items: [
      {
        id: 1,
        name: "lumpia original",
        img: "1.png",
        price: 13000,
        description: "Lumpia dengan isian rebung dan telur di dalamnya",
      },
      {
        id: 2,
        name: "lumpia ayam",
        img: "2.png",
        price: 14000,
        description: "Lumpia dengan isian rebung, telur dan ayam di dalamnya",
      },
      {
        id: 3,
        name: "lumpia ayam pedas",
        img: "3.png",
        price: 14000,
        description:
          "Lumpia dengan isian rebung, telur, cabai dan ayam di dalamnya",
      },
      {
        id: 4,
        name: "lumpia ayam jamur",
        img: "4.png",
        price: 15000,
        description:
          "Lumpia dengan isian rebung, telur, jamur dan ayam di dalamnya",
      },
      {
        id: 5,
        name: "lumpia udang",
        img: "5.png",
        price: 17000,
        description: "Lumpia dengan isian rebung, telur dan udang di dalamnya",
      },
      {
        id: 6,
        name: "lumpia spesial",
        img: "6.png",
        price: 18000,
        description:
          "Lumpia dengan isian rebung, telur, ayam, jamur dan udang di dalamnya",
      },
    ],
  }));
  Alpine.store("wishlist", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const wishlistItem = this.items.find((item) => item.id === newItem.id);

      if (!wishlistItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const wishlistItem = this.items.find((item) => item.id === id);

      if (wishlistItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (wishlistItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= wishlistItem.price;
      }
    },
  });
});

//currency rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
