import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const useSavingsGoal = (params = {}) => {
  const { currentUser } = useAuthContext();
  // reach out to db collection
  const colSavingsRef = collection(db, "goals");
  // create queryKey to get savings from specific user
  const queryKey = ["savings", currentUser.uid];

  const queryRef =
    params.fetchOnlyCurrentUser &&
    query(colSavingsRef, where("user", "==", currentUser.uid));

  const goalsQuery = useFirestoreQueryData(
    queryKey,
    queryRef,
    { idField: "_id", subscribe: true },
    { refetchOnMount: "always" }
  );
  return goalsQuery;
};

export default useSavingsGoal;
