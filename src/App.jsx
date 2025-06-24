import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Signup from './components/Signup';
function App() {
  return(
    <Router>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/signin' element={<Signup/>} />
         
</Routes>
      <Footer/>
    </Router>
  )
  
}

export default App;


