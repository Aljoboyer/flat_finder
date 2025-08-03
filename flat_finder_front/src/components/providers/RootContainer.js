/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { persistor, store } from "@/app/redux/store";
import { notificationToast } from "@/utils/toaster/toaster";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function ProviderWraper({ children }) {

  return (

      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
      </Provider>

  );
}
