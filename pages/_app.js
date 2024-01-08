import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LoadingStateProvider } from "../store/loadingState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  //initializations
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingStateProvider>
        <Head>
          <title>
            Taskmann - Let our taskers make life easier at an affordable rate
          </title>
          <link rel="icon" href="/assets/trademarks/taskmann-logo.png" />
        </Head>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen="false" position="bottom-right" /> */}
      </LoadingStateProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
