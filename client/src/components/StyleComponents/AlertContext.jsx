// context/AlertContext.jsx
import React, { createContext, useContext, useState } from "react";
import AlertModal from "./AlertModel";


const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [config, setConfig] = useState({ open: false });

  const showAlert = (options) => {
    setConfig({
      open: true,
      ...options,
    });
  };

  const closeAlert = () => {
    setConfig((c) => ({ ...c, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <AlertModal
        {...config}
        onClose={closeAlert}
        onConfirm={() => {
          config.onConfirm?.();
          closeAlert();
        }}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be inside AlertProvider");
  return ctx;
};
