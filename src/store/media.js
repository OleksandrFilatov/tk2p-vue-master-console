import { apolloClient } from "../vue-apollo";
import gql from 'graphql-tag'

export default {
  getters: {
    getDefaultBgs: state => state.defaultLibraryItems,
    getUserBgs: state => state.userLibraryItems,
    allBgs: state => [...state.defaultLibraryItems, ...state.userLibraryItems]
  },
  state: {
    defaultLibraryItems: [] ,
    userLibraryItems: []
  },
  mutations: {
    setStockBgs: function setStockBgs (state, payload) {
      
      state.defaultLibraryItems = payload
    }
  },
  actions: {
    async uploadStockBackground({dispatch}, {imageData, name}) {
      const { data } = await apolloClient.mutate({
        variables: {
          data: {
            url: imageData,
            name
          },
        },
        mutation: gql`
          mutation createStockBg($data: StockBackgroundInput!) {
            createStockBackground(data: $data) {
              id
            }
          }
        `,
      });
      if (data) {
        await dispatch("getStockBackgrounds");
      }      
    },
    async deleteStockBackground({dispatch}, {id}) {
      const { data } = await apolloClient.mutate({
        variables: {
          id
        },
        mutation: gql`
          mutation deleteStockBg($id: String!) {
            deleteStockBackground(id: $id) {
              id
            }
          }
        `,
      });
      if (data) {
        await dispatch("getStockBackgrounds");
      }      
    },
    async getStockBackgrounds({commit}) {
      const {data} = await apolloClient.query({
        fetchPolicy: "network-only",
        query: gql`
          query fetchStockBgs  {
            stockBackgrounds {
              id
              name
              url
            }
          }
        `
      })
      commit('setStockBgs', data.stockBackgrounds)
    } 
  }
}