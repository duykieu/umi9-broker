const defaultState = {
    token: null,
    user: null,
    permissions: [],
};

export const state = () => ({ ...defaultState });

export const mutations = {
    set(state, auth) {
        console.log({ currentAuth: auth });
        Object.assign(state, auth);
    },
    unset(state) {
        Object.assign(state, defaultState);
    },
};
