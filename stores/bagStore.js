import { defineStore } from "pinia";

export const useBagStore = defineStore("bag", () => {
  const bag = ref([]);

  const toast = useToast();

  function addToBag(item) {
    bag.value.push(item);
    toast.add({ title: "Added to bag" });
    console.log(bag.value);
  }

  return { bag, addToBag };
});
