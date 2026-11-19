import { products } from '@/data/products'

export function MarqueeStrip() {
  return (
    <div className="marquee-strip" role="region" aria-label="Product categories">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {products.map(({ name }, index) => (
              <span className="marquee-item" key={`${name}-${index}`}>
                {name}<span className="marquee-dot" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
