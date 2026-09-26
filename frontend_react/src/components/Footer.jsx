function Footer() {
  return (
    <footer>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-6 px-5 mb-4 mb-md-0">
            <img src="/images/logo-deep-white.png" className="logo mb-3" alt="Logo Colegio" />
            <p>Formando líderes desde 1993. Educación de calidad y excelencia académica</p>
            <hr />
            <div className="d-flex mt-3">
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/Instagram_Glyph_White.png" alt="Logotipo Instagram" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/Facebook_Logo_Secondary.png" alt="Logotipo Facebook" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/logo-white.png" alt="Logotipo X" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/InBug-White.png" alt="Logotipo LinkedIn" />
              </a>
            </div>
          </div>
          <div className="col-md-6 px-5">
            <ul className="list-unstyled">
              <li className="mb-4">
                <span className="fs-5 fw-bold">Contacto</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bx bx-location fs-5 me-2 icono-ubicacion"></i>
                Av. Ubicación 123
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bx bx-phone fs-5 me-2 icono-telefono"></i>
                +56 9 9876 5432
              </li>
              <li className="d-flex align-items-center">
                <i className="bx bx-envelope fs-5 me-2 icono-correo"></i>
                correo.ejemplo@colegio.cl
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;