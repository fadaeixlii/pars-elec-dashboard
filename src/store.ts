import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "./store/User/Reducers/userDetail.reducer";
import userDetailListReducer from "./store/User/Reducers/userDetailList.reducer";
import NetworkListReducer from "./store/Wallet/Reducers/networkList.reducer";
import PropertyListReducer from "./store/Wallet/Reducers/propertyList.reducer";
import systemUserAssetsReducer from "./store/Wallet/Reducers/systemUserAssets.reducer";
import SystemAssets from "./store/Wallet/Reducers/systemAssetsPublic.reducer";
import UserWalletListReducer from "./store/Wallet/Reducers/userWalletList.reducer";
import SmallAssetsConfigListReducer from "./store/Wallet/Reducers/smallAssetsConfigList.reducer";
import PropertyListAllReducer from "./store/Wallet/Reducers/propertyListAll.reducer";
import marketPublicListReducer from "./store/Orderbook/Reducers/marketPublicList.reducer";
import listCategoriesReducer from "./store/Orderbook/Reducers/listCategories.reducer";
import marketListAdminReducer from "./store/Orderbook/Reducers/marketListAdmin.reducer";
import TransactionAllListReducer from "./store/Wallet/Reducers/transactionAllList.reducer";
import TransactionFiatAllListReducer from "./store/Wallet/Reducers/transactionFiatAllList.reducer";
import listAdminCategoriesReducer from "./store/Orderbook/Reducers/listAdminCategories.reducer";
import MarketListAdminCategoryReducer from "./store/Orderbook/Reducers/marketListAdminCategory.reducer";
import OrderListAdminReducer from "./store/Orderbook/Reducers/orderListAdmin.reducer";
import CountryListReducer from "./store/KYC/Reducers/countryList.reducer";
import OrderHistoryListAdminReducer from "./store/Orderbook/Reducers/orderHistoryListAdmin.reducer";
import MMMarketListListReducer from "./store/MM/Reducers/MMMarketList.reducer";
import UserAssetsReducer from "./store/Wallet/Reducers/userAssets.reducer";
import userKycLevelInfoReducer from "./store/KYC/Reducers/userKycLevelInfo.reducer";
import uniqueKeysKYCReducer from "./store/KYC/Reducers/uniqueKeysKYC.reducer";
import MMEngineStateReducer from "./store/MM/Reducers/MMEngineState.reducer";
import MMInvestingListReducer from "./store/MM/Reducers/MMInvestingList.reducer";
import ReferralCodesReducer from "./store/KYC/Reducers/referralCodes.reducer";
import LangsInfoReducer from "./store/KYC/Reducers/langsInfoList.reducer";
import TranslateListReducer from "./store/KYC/Reducers/translateList.reducer";
import UsersKycListReducer from "./store/KYC/Reducers/usersKycList.reducer";
import FormValuesReducer from "./store/KYC/Reducers/formValues.reducer";
import VipAdminListReducer from "./store/KYC/Reducers/vipAdminList.reducer";
import uniqueKeysVIPReducer from "./store/KYC/Reducers/uniqueKeysVIP.reducer";
import kycFormData from "./store/KYC/Reducers/userKycFormData.reducer";
import FormGroupsReducer from "./store/KYC/Reducers/formGroups.reducer";
import FormSectionsReducer from "./store/KYC/Reducers/formSections.reducer";
import FormSectionsGroupReducer from "./store/KYC/Reducers/formSectionsGroup.reducer";
import TicketsListReducer from "./store/Messaging/Reducers/ticketsList.reducer";

// Setup redux-first-history

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",

  reducer: combineReducers({
    userDetail: userDetailReducer,
    userDetailList: userDetailListReducer,
    networkList: NetworkListReducer,
    propertyList: PropertyListReducer,
    propertyListAll: PropertyListAllReducer,
    systemUserAssets: systemUserAssetsReducer,
    systemAssets: SystemAssets,
    userWallet: UserWalletListReducer,
    smallAssetsConfigList: SmallAssetsConfigListReducer,
    marketPublicList: marketPublicListReducer,
    marketListAdminCategory: MarketListAdminCategoryReducer,
    listCategories: listCategoriesReducer,
    listAdminCategories: listAdminCategoriesReducer,
    marketListAdmin: marketListAdminReducer,
    transactionAllList: TransactionAllListReducer,
    transactionFiatAllList: TransactionFiatAllListReducer,
    orderListAdmin: OrderListAdminReducer,
    orderHistoryListAdmin: OrderHistoryListAdminReducer,
    countryList: CountryListReducer,
    mmMarketList: MMMarketListListReducer,
    mmEngineState: MMEngineStateReducer,
    userAssets: UserAssetsReducer,
    userKycLevelInfo: userKycLevelInfoReducer,
    uniqueKeysKYC: uniqueKeysKYCReducer,
    mmInvestingList: MMInvestingListReducer,
    referralCodes: ReferralCodesReducer,
    langsInfo: LangsInfoReducer,
    translateList: TranslateListReducer,
    usersKycList: UsersKycListReducer,
    formValues: FormValuesReducer,
    vipAdminList: VipAdminListReducer,
    uniqueKeysVIP: uniqueKeysVIPReducer,
    kycFormData: kycFormData,
    formGroups: FormGroupsReducer,
    formSections: FormSectionsReducer,
    formSectionsGroup: FormSectionsGroupReducer,
    ticketsList: TicketsListReducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch)
