import { defineStore } from "pinia";

export const useWishlistStore = defineStore(
  "wishlist",
  () => {
    const wishlist = ref([]);

    const toast = useToast();

    function addToWishlist(item) {
      const isItemInWishlist = wishlist.value.findIndex(function (book) {
        return item.id == book.id;
      });
      console.log(wishlist.value);
      if (isItemInWishlist === -1) {
        wishlist.value.push(item);
        toast.add({ title: "Added to wishlist" });
      } else {
        toast.add({ title: "Item Already in wishlist" });
      }
    }

    function removeItemFromWishlist(item) {
      const newWishlist = wishlist.value.filter((book) => {
        return item.id != book.id;
      });

      wishlist.value = newWishlist;
    }

    return { wishlist, addToWishlist, removeItemFromWishlist };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
