import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", () => {
  const wishlist = ref([]);

  const toast = useToast();

  function addToWishlist(item) {
    wishlist.value.push(item);
    toast.add({ title: "Added to wishlist" });
    console.log(wishlist.value);
  }

  return { wishlist, addToWishlist };
});
