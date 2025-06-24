import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Write from './components/Write';
function App() {
  return(
    <Router>
      <Navbar/>
     <Routes>
 <Route path="/" element={<Home />} />
      <Route path='/signin' element={<Signup/>} />
      <Route path='/write' element={<Write/>} />
         
</Routes>
      <Footer/>
    </Router>
  )
  
}

export default App;


