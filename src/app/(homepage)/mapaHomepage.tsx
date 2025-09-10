const MapaHomepage = () => {
  return (
    <section id='mapaHomepage'>
      <iframe
        aria-label='Mapa de São Bento do Sapucai - SP'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.34695488773!2d-45.66375792387376!3d-22.67812457941675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc7de7a1085cab%3A0xfbaf5cb9454d9009!2sRef%C3%BAgio%20da%20Pedra%20Sp!5e0!3m2!1spt-BR!2sbr!4v1757446802120!5m2!1spt-BR!2sbr'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        className='w-full h-96'
      />
    </section>
  );
};

export default MapaHomepage;
