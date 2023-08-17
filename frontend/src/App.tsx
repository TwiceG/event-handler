import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import AddEvent from "./pages/AddEvent.tsx";
import UpcomingEvents from "./pages/UpcomingEvents.tsx";
import OngoingEvents from "./pages/OngoingEvents.tsx";
import EventDetails from "./pages/EventDetails.tsx";
import AddPlayer from "./pages/AddPlayer.tsx";
import Footer from "./components/Footer.tsx";


function App() {


    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/event-details/:id" element={ <EventDetails />}/>
                    <Route path="/add-event" element={ <AddEvent />}/>
                    <Route path="/ongoing-events" element={<OngoingEvents />}/>
                    <Route path="/upcoming-events" element={ <UpcomingEvents /> }/>
                    <Route path="/add-player" element={ <AddPlayer /> }/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    )
}


export default App
