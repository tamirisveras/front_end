import Carousel from 'react-bootstrap/Carousel';

const CarouselHome = ()=> {
  return (
    <div>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/images/sabao.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h5>Doações e coletas de óleo</h5>
          <p>Você colabora muito fazendo parte do nosso projeto</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/images/sabao-caseiro.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          {/* <h5>Sabão Ecológico: Limpeza Sustentável para uma Pele Saudável</h5>
          <p>O sabão de óleo de cozinha reciclado combina sustentabilidade e cuidado com a pele, oferecendo uma alternativa eficaz e ecológica para a limpeza diária.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/assets/images/recicla.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          {/* <h5>Reutilização</h5>
          <p>
          Transforme a sustentabilidade em ação diária: opte pela reutilização de óleo para criar sabão, preservando o meio ambiente e promovendo práticas conscientes.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br/>
    </div>
  )
}

export default CarouselHome