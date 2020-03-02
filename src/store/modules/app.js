import Vue from "vue";
import { resolve } from "q";

const app = {
    state: {
        BigScreenExpirationDate: "",

    },
    mutations: {
    },
    actions: {

        // /////////////////
        set_ADD_VIP_targetOption({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                state.ADD_VIP_targetOption = data;
                resolve("ADD_VIP_targetOption - SUCCESS !");
            })
        },
        get_ADD_VIP_targetOption({ commit, state }) {
            return new Promise((resolve, reject) => {
                resolve(state.ADD_VIP_targetOption);
            })
        },
        // /////////////////

    }
}

export default app
