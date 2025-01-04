import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";

function MainRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:routerType/:routerUuid" element={<App />} />
            </Routes>
        </Router>
    );
}

export default MainRouter;
