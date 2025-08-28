import { Star, Truck, Shield, HeartFill } from 'react-bootstrap-icons'

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En compras superiores a €50'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Pagos 100% seguros y protegidos'
    },
    {
      icon: Star,
      title: 'Calidad Premium',
      description: 'Productos auténticos y de alta calidad'
    },
    {
      icon: HeartFill,
      title: 'Atención Personal',
      description: 'Asesoramiento especializado'
    }
  ]

  return (
    <section className='py-5'>
      <div className='container'>
        <div className='row text-center'>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className='col-lg-3 col-md-6 mb-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body'>
                    <IconComponent size={48} className='text-primary-custom mb-3' />
                    <h5>{feature.title}</h5>
                    <p className='text-muted'>{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
