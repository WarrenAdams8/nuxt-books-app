import { defineStore } from "pinia";

export const useBagStore = defineStore(
  "bag",
  () => {
    const bag = ref([]);

    const toast = useToast();

    function addToBag(item) {
      const isItemInBag = bag.value.findIndex(function (book) {
        return item.id == book.id;
      });
      if (isItemInBag === -1) {
        bag.value.push(item);
        toast.add({ title: "Added to bag" });
      } else {
        toast.add({ title: "Item Already in bag" });
      }
    }

    function removeItemFromBag(item) {
      const newbag = bag.value.filter((book) => {
        return item.id != book.id;
      });

      bag.value = newbag;
    }

    return { bag, addToBag, removeItemFromBag };
  },

  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
