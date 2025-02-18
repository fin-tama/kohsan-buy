document.addEventListener("alpine:init", () => {
  Alpine.data("wishlists", () => ({
    items: [
      {
        id: 1,
        name: "lumpia spesial",
        img: "1.jpeg",
        price: 18000,
        description:
          "Lumpia dengan isian rebung, telur, ayam, dan udang di dalamnya",
      },
      {
        id: 2,
        name: "lumpia original",
        img: "2.jpeg",
        price: 14000,
        description: "Lumpia dengan isian rebung dan telur di dalamnya",
      },
      {
        id: 3,
        name: "lumpia ayam pedas",
        img: "3.jpeg",
        price: 15000,
        description:
          "Lumpia dengan isian rebung, telur, cabai dan ayam di dalamnya",
      },
      {
        id: 4,
        name: "lumpia ayam",
        img: "4.jpeg",
        price: 15000,
        description: "Lumpia dengan isian rebung, telur dan ayam di dalamnya",
      },
      {
        id: 5,
        name: "lumpia udang",
        img: "5.jpeg",
        price: 17000,
        description: "Lumpia dengan isian rebung, telur dan udang di dalamnya",
      },
      {
        id: 6,
        name: "lumpia pisang coklat",
        img: "6.jpeg",
        price: 18000,
        description: "Lumpia dengan isian pisang dan coklat di dalamnya",
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

//form validation
const buyButton = document.querySelector(".buy-button");
buyButton.disabled = true;

const form = document.querySelector("#buy");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      buyButton.classList.remove("disabled");
      buyButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  buyButton.disabled = false;
  buyButton.classList.remove("disabled");
});

//data buy click
buyButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = messageBuy(objData);
  window.open(
    "http://wa.me/+6285925280135?text=" + encodeURIComponent(message)
  );
});

//message buy
const messageBuy = (obj) => {
  return `Detail Pembeli
  Nama: ${obj.name}
  No WA: ${obj.nomor}
  Email: ${obj.email}
  Alamat: ${obj.address}
Detail Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.`;
};

//currency rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
