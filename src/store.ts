import Vue from "vue";
import Vuex from "vuex";
import MarketplaceItemModel from "./models/marketplaceItemModel";
import performItemsFiltering from "./utils/filter";
import { resetPaging, addNextPage } from "./utils/pager";

export const updateAllItemsMutation = "updateAllItems";
export const updateFilteredItemsMutation = "updateFilteredItems";
export const updateItemsToShowMutation = "updateItemsToShow";
export const updateTagsCountMutation = "updateTagsCount";
export const updateCategoriesCountMutation = "updateCategoriesCount";

export const updateFilterSearchPhraseMutation = "updateFilterSearchPhrase";
export const updateSelectedCategoriesMutation = "updateSelectedCategories";
export const toggleCategoryInSelectedCategoriesMutation =
  "toggleCategoryInSelectedCategories";

export const addNextPageInPagerListingMutation = "addNextPageInPagerListing";
export const updatePagerLastItemIndexMutation = "updatePagerLastItemIndex";

export const initItemsStateAction = "initItemsState";
export const addPageAction = "addPage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      allItems: Array<MarketplaceItemModel>(),
      filteredItems: Array<MarketplaceItemModel>(),
      itemsToShow: Array<MarketplaceItemModel>(),
      tagsCount: new Map<string, number>(),
      categoriesCount: new Map<string, number>()
    },
    filter: {
      searchPhrase: "",
      selectedCategories: new Set<string>()
    },
    pager: {
      lastItemIndex: 0
    }
  },
  mutations: {
    updateAllItems(state, allItems: Array<MarketplaceItemModel>) {
      state.data.allItems = allItems;
    },
    updateFilteredItems(state, filteredItems: Array<MarketplaceItemModel>) {
      state.data.filteredItems = filteredItems;
    },
    updateItemsToShow(state, itemsToShow: Array<MarketplaceItemModel>) {
      state.data.itemsToShow = itemsToShow;
    },
    updateTagsCount(state, tagsCount: Map<string, number>) {
      state.data.tagsCount = tagsCount;
    },
    updateCategoriesCount(state, categoriesCount: Map<string, number>) {
      state.data.categoriesCount = categoriesCount;
    },
    updateFilterSearchPhrase(state, newSearchPhrase: string) {
      state.filter.searchPhrase = newSearchPhrase;
    },
    updateSelectedCategories(state, selectedCategories: Set<string>) {
      state.filter.selectedCategories = selectedCategories;
    },
    updatePagerLastItemIndex(state, lastItemIndex) {
      state.pager.lastItemIndex = lastItemIndex;
    }
  },
  getters: {
    allItems: state => state.data.allItems,
    filteredItems: state => state.data.filteredItems,
    itemsToShow: state => state.data.itemsToShow,
    tagsCount: state => state.data.tagsCount,
    categoriesCount: state => state.data.categoriesCount,
    filterSearchphrase: state => state.filter.searchPhrase,
    selectedCategories: state => state.filter.selectedCategories,
    pagerLastItemIndex: state => state.pager.lastItemIndex
  },
  actions: {
    initItemsState(context, allItems) {
      context.commit(updateAllItemsMutation, allItems);
      context.commit(updateFilteredItemsMutation, allItems);
      resetPaging();
    },
    updateFilterPassphrase(context, newSearchPhrase: string) {
      context.commit(updateFilterSearchPhraseMutation, newSearchPhrase);
    },
    filterItems(_) {
      performItemsFiltering();
    },
    addPage(_) {
      addNextPage();
    }
  }
});
