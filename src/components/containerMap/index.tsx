const ContainerMap = () => {
  return (
    <section id='containerMap'>
      <iframe
        aria-label='google maps'
        className='w-full h-96 mt-6 md:mt-12'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3469548877215!2d-45.66375792387373!3d-22.67812457941675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc7de7a1085cab%3A0xfbaf5cb9454d9009!2sRef%C3%BAgio%20da%20Pedra%20Sp!5e0!3m2!1spt-BR!2sbr!4v1752720092759!5m2!1spt-BR!2sbr'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </section>
  );
};

export default ContainerMap;
