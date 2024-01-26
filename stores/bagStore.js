import { defineStore } from "pinia";

const toast = useToast();

export const useBagStore = defineStore(
  "bag",
  () => {
    const bag = ref([]);

    const total = computed(() => {
      let total = 0;

      bag.value.forEach((book) => {
        total = total + book.saleInfo.listPrice.amount;
        console.log(book.saleInfo.listPrice.amount);
      });

      return total
    });

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

    return { bag, addToBag, removeItemFromBag, total };
  },

  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
