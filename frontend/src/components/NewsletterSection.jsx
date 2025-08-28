const NewsletterSection = () => {
  return (
    <section className='py-5 bg-gradient-custom text-white'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 text-center'>
            <h3 className='mb-3'>Mantente Conectado con el Misterio</h3>
            <p className='mb-4'>
              Suscríbete a nuestro newsletter y recibe ofertas especiales,
              consejos de tarot y novedades sobre productos esotéricos.
            </p>
            <div className='input-group input-group-lg'>
              <input
                type='email'
                className='form-control'
                placeholder='Tu email'
                aria-label='Email'
              />
              <button className='btn btn-light' type='button'>
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
