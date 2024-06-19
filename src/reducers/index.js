import { combineReducers } from "redux";

import game from "./user/game/game";
import bird from "./user/game/bird";
import pipe from "./user/game/pipe";
import display from "./display";
import gift from "./user/game/gift";

export default combineReducers({
    game,
    bird,
    pipe,
    gift,
    display
});