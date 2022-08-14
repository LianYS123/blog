import React from "react";
import { SnackbarProvider } from "notistack";
import AlertDialogProvider from "providers/AlertDialogProvider";
import LoginDialogProvider from "providers/LoginDialogProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GlobalProgress } from "components/progress/GlobalProgress";
import { AppThemeProvider } from "./AppThemeProvider";
import { AppStoreProvider } from "./AppStoreProvider";
import { InitAppProvider } from "./InitAppProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <AppStoreProvider>
      <AppThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
              <AlertDialogProvider>
                <LoginDialogProvider>
                  {/* 全局加载状态 */}
                  <InitAppProvider>
                    <GlobalProgress />
                    {children}
                  </InitAppProvider>
                </LoginDialogProvider>
              </AlertDialogProvider>
            </SnackbarProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </AppThemeProvider>
    </AppStoreProvider>
  );
};
