export const userStatistics = (arr, callback) => {
    let allUser = arr.length;
    let allUserProc =  100 / allUser;
    let currentUser = callback.length;
    let currentUserProc = allUserProc * currentUser;
    return currentUserProc;
}