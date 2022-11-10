"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.initialize = void 0;
var react_query_1 = require("@tanstack/react-query");
function initialize(axios, config) {
    var requests = makeRequests(axios, config === null || config === void 0 ? void 0 : config.axios);
    var queryIds = makeQueryIds();
    return {
        requests: requests,
        queryIds: queryIds,
        queries: makeQueries(requests, queryIds),
        mutations: makeMutations(requests, config === null || config === void 0 ? void 0 : config.mutations)
    };
}
exports.initialize = initialize;
function useRapiniMutation(mutationFn, config, options) {
    var _a = options !== null && options !== void 0 ? options : {}, onSuccess = _a.onSuccess, onError = _a.onError, onSettled = _a.onSettled, rest = __rest(_a, ["onSuccess", "onError", "onSettled"]);
    var queryClient = (0, react_query_1.useQueryClient)();
    var conf = config === null || config === void 0 ? void 0 : config(queryClient);
    var mutationOptions = __assign({ onSuccess: function (data, variables, context) {
            var _a;
            (_a = conf === null || conf === void 0 ? void 0 : conf.onSuccess) === null || _a === void 0 ? void 0 : _a.call(conf, data, variables, context);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(data, variables, context);
        }, onError: function (error, variables, context) {
            var _a;
            (_a = conf === null || conf === void 0 ? void 0 : conf.onError) === null || _a === void 0 ? void 0 : _a.call(conf, error, variables, context);
            onError === null || onError === void 0 ? void 0 : onError(error, variables, context);
        }, onSettled: function (data, error, variables, context) {
            var _a;
            (_a = conf === null || conf === void 0 ? void 0 : conf.onSettled) === null || _a === void 0 ? void 0 : _a.call(conf, data, error, variables, context);
            onSettled === null || onSettled === void 0 ? void 0 : onSettled(data, error, variables, context);
        } }, rest);
    return (0, react_query_1.useMutation)(mutationFn, mutationOptions);
}
function nullIfUndefined(value) {
    return typeof value === "undefined" ? null : value;
}
function makeQueryIds() {
    return {
        listPets: function (limit) { return ["listPets", nullIfUndefined(limit)]; },
        showPetById: function (petId) { return ["showPetById", petId]; }
    };
}
function makeRequests(axios, config) {
    return {
        listPets: function (limit) { return axios.request({
            method: "get",
            url: "/pets",
            params: __assign({}, (limit !== undefined ? { limit: limit } : undefined)),
            paramsSerializer: config === null || config === void 0 ? void 0 : config.paramsSerializer
        }).then(function (res) { return res.data; }); },
        createPets: function () { return axios.request({
            method: "post",
            url: "/pets"
        }).then(function (res) { return res.data; }); },
        showPetById: function (petId) { return axios.request({
            method: "get",
            url: "/pets/".concat(petId)
        }).then(function (res) { return res.data; }); }
    };
}
function makeQueries(requests, queryIds) {
    return {
        useListPets: function (limit, options) { return (0, react_query_1.useQuery)(queryIds.listPets(limit), function () { return requests.listPets(limit); }, options); },
        useShowPetById: function (petId, options) { return (0, react_query_1.useQuery)(queryIds.showPetById(petId), function () { return requests.showPetById(petId); }, options); }
    };
}
function makeMutations(requests, config) {
    return {
        useCreatePets: function (options) { return useRapiniMutation(function () { return requests.createPets(); }, config === null || config === void 0 ? void 0 : config.useCreatePets, options); }
    };
}
