import { combineReducers } from "redux";

import game from "./game/game";
import bird from "./game/bird";
import pipe from "./game/pipe";

export default combineReducers({
    game,
    bird,
    pipe,
});