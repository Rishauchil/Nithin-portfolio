import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Credentials from './components/Credentials/Credentials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import InteractiveBackground from './components/InteractiveBackground';
import FlyingBadge from './components/FlyingBadge';

function App() {
  return (
    <>
      <InteractiveBackground />
      <FlyingBadge />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
