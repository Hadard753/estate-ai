import { useHistory } from "react-router-dom";

let navigateTo: Function;
function Navigate() {
  let history = useHistory();
  navigateTo = (to: string) => {
    history.push(to);
  }
};

export {
    navigateTo,
}