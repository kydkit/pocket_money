import { collection, orderBy, query, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const useGetFinances = (params = {}) => {
  const { currentUser } = useAuthContext();

  const colFinancesRef = collection(db, "finances");

  const queryKey = params.fetchOnlyCurrentUser
    ? ["finances", currentUser.uid]
    : ["finances"];

  const queryRef = params.fetchOnlyCurrentUser
    ? query(
        colFinancesRef,
        where("owner", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      )
    : query(colFinancesRef, orderBy("timestamp"));
  // const queryRef = query(collection(db, "finances"), orderBy("timestamp"));

  const { data, isLoading } = useFirestoreQueryData(
    queryKey,
    queryRef,
    {
      idField: "id",
      subscribe: true,
    },
    { refetchOnMount: "always" }
  );
  return { data, isLoading };
};

export default useGetFinances;
