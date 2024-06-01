import { combineReducers } from "redux";

import game from "./game/game";
import bird from "./game/bird";
import pipe from "./game/pipe";
import display from "./display";

export default combineReducers({
    game,
    bird,
    pipe,
    display
});