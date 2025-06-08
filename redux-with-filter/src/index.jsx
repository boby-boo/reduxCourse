import { createRoot } from "react-dom/client";
import { configureStore } from "./store";
import {Root} from "./Root";


const store = configureStore();

createRoot(document.getElementById('root')).render(
  <Root store={store}/>
);