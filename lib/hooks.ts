import useSWR from "swr";
import fetcher from "./fetcher";

export const useCurrentLoggedInUser = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylists = () => {
  console.log("playlist hook called");
  //const { data, error } = useSWR('/playlist', fetcher)

  // return{
  //   playlists: data,
  //   isLoading: !data && !error,
  //   isError: error
  // }
  return {
    playlists: [{ id: 1, name: "1" }],
    isLoading: false,
    isError: "No Error",
  };
};
