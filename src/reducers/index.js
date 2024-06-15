import { combineReducers } from "redux";

import game from "./game/game";
import bird from "./game/bird";
import pipe from "./game/pipe";
import display from "./display";
import gift from "./game/gift";

export default combineReducers({
    game,
    bird,
    pipe,
    gift,
    display
});