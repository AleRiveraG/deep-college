function Footer() {
  return (
    <footer>
      <div className="container-fluid py-5 contenedor-pie">
        <div className="row fila-pie">
          <div className="col-md-6 px-5 mb-4 mb-md-0 informacion-colegio">
            <img src="/images/logo-deep-white.png" className="logo img-fluid mb-3" alt="Logo Colegio" />
            <p className="lema-colegio">Formando líderes desde 1993. Educación de calidad y excelencia académica</p>
            <hr />
            <div className="d-flex mt-3">
              <a href="#" className="me-3" aria-label="Instagram">
                <img className="logos-enlaces img-fluid" src="/images/Instagram_Glyph_White.png" alt="Logotipo Instagram" />
              </a>
              <a href="#" className="me-3" aria-label="Facebook">
                <img className="logos-enlaces img-fluid" src="/images/Facebook_Logo_Secondary.png" alt="Logotipo Facebook" />
              </a>
              <a href="#" className="me-3" aria-label="Twitter X">
                <img className="logos-enlaces img-fluid" src="/images/logo-white.png" alt="Logotipo X" />
              </a>
              <a href="#" className="me-3" aria-label="LinkedIn">
                <img className="logos-enlaces img-fluid" src="/images/InBug-White.png" alt="Logotipo LinkedIn" />
              </a>
            </div>
          </div>
          <div className="col-md-6 px-5 informacion-contacto">
            <ul className="list-unstyled lista-contacto">
              <li className="item-contacto mb-4">
                <span className="titulo-contacto fs-5 fw-bold">Contacto</span>
              </li>
              <li className="item-contacto mb-2 d-flex align-items-center">
                <i className="bx bx-location fs-5 me-2 icono-ubicacion"></i>
                Av. Ubicación 123
              </li>
              <li className="item-contacto mb-2 d-flex align-items-center">
                <i className="bx bx-phone fs-5 me-2 icono-telefono"></i>
                +56 9 9876 5432
              </li>
              <li className="item-contacto d-flex align-items-center">
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