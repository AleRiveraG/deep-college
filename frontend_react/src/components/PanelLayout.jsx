import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

function PanelLayout({
  rol,
  claseEtiqueta,
  claseSeccion = 'py-4 px-4',
  children,
}) {
  return (
    <>
      <Header rol={rol} claseEtiqueta={claseEtiqueta} />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <NavBar />
            <section className={`col-12 col-md-9 col-lg-10 ${claseSeccion}`}>
              {children}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PanelLayout;
