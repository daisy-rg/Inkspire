import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Write from './components/Write';
import Postlist from './pages/Postlist';
import FullPost from './components/Fullpost';
function App() {
  return(
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signin' element={<Signup/>} />
      <Route path='/write' element={<Write/>} />
      <Route path='/get-started' element={<Signup/>} />
      <Route path='/start' element={<Postlist/>} />
      <Route path="/posts/:postId" element={<FullPost />} />
         
</Routes>
      <Footer/>
    </Router>
  )
  
}

export default App;


