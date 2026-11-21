'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AboutNavigation } from '@/components/site/about-navigation'
import { Footer } from '@/components/site/footer'
import { contactDetails } from '@/lib/contact'
import { unsplashUrl } from '@/lib/img'
import styles from './contact.module.css'

type ContactField = 'name' | 'email' | 'message'
type ContactValues = Record<ContactField, string>
type ContactErrors = Partial<Record<ContactField, string>>

const detailsGroups = [
  {
    label: 'MOBILE',
    values: [
      { text: '+251 911 606 155', href: `tel:${contactDetails.mobile[0]}` },
      { text: '+251 911 442 643', href: `tel:${contactDetails.mobile[1]}` },
    ],
  },
  {
    label: 'TELEPHONE',
    values: [
      { text: '+251 11 279 1264', href: `tel:${contactDetails.telephone[0]}` },
      { text: '+251 11 279 3092', href: `tel:${contactDetails.telephone[1]}` },
    ],
  },
  {
    label: 'FAX',
    values: [
      { text: '+251 11 661 1888' },
      { text: '+251 11 551 7454' },
    ],
  },
  {
    label: 'LOCATION',
    values: [{ text: 'Addis Ababa, Ethiopia' }],
  },
] as const

const fields: { name: ContactField; placeholder: string; type?: 'email' }[] = [
  { name: 'name', placeholder: 'Your name' },
  { name: 'email', placeholder: 'Your email', type: 'email' },
  { name: 'message', placeholder: 'Your message' },
]

export function ContactPageContent() {
  const reducedMotion = useReducedMotion() === true
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: ContactErrors = {}

    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) nextErrors.message = 'Please enter a message.'

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
    // TODO: connect email sending here.
  }

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitted(false)
  }

  const fieldMotion = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : delay },
  })

  return (
    <div className={styles.page}>
      <AboutNavigation />
      <main className={styles.main} aria-label="Contact Nyala">
        <section className={styles.hero} aria-labelledby="contact-title">
          <motion.div
            className={styles.photo}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          >
            <Image
              alt="Leather workshop tools and materials"
              className={styles.photoImage}
              fill
              priority
              sizes="100vw"
              src={unsplashUrl('photo-1520639888713-7851133b1ed0', 1600, 75, 900)}
            />
            <div className={styles.photoShade} />
          </motion.div>
          <motion.svg
            aria-hidden="true"
            className={styles.wave}
            viewBox="0 0 700 60"
            preserveAspectRatio="none"
            initial={reducedMotion ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <path d="M0 16 C105 60 210 48 318 29 C420 11 510 45 605 28 C645 21 675 10 700 14 L700 60 L0 60 Z" fill="#832E29" />
          </motion.svg>
          <div className={styles.heroInner}>
            <motion.h1
              id="contact-title"
              className={styles.title}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.12 }}
            >
              Contact Us
            </motion.h1>
          </div>
        </section>

        <motion.section
          className={styles.card}
          aria-label="Contact details and message form"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <div className={styles.details}>
            <div className={styles.detailsGrid}>
              {detailsGroups.map((group, index) => (
                <motion.div className={styles.detailsGroup} key={group.label} {...fieldMotion(0.82 + index * 0.08)}>
                  <h2 className={styles.detailsLabel}>{group.label}</h2>
                  <div className={styles.values}>
                    {group.values.map((value) => (
                      <p className={styles.value} key={value.text}>
                        {'href' in value ? (
                          <a className={styles.phoneLink} href={value.href}>{value.text}</a>
                        ) : value.text}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <a className={styles.callNow} href={`tel:${contactDetails.mobile[0]}`}>Call Now</a>
          </div>

          <div className={styles.formPanel}>
            <motion.h2 className={styles.formTitle} {...fieldMotion(1.43)}>Send us a message</motion.h2>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              {fields.map((field, index) => {
                const error = errors[field.name]
                const sharedProps = {
                  'aria-describedby': error ? `${field.name}-error` : undefined,
                  'aria-invalid': Boolean(error),
                  className: styles.field,
                  name: field.name,
                  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(field.name, event.target.value),
                  placeholder: field.placeholder,
                  required: true,
                  value: values[field.name],
                }

                return (
                  <motion.div className={styles.fieldWrap} key={field.name} {...fieldMotion(1.5 + index * 0.08)}>
                    <label className="sr-only" htmlFor={`contact-${field.name}`}>{field.placeholder}</label>
                    {field.name === 'message' ? (
                      <textarea {...sharedProps} id={`contact-${field.name}`} rows={5} />
                    ) : (
                      <input {...sharedProps} id={`contact-${field.name}`} type={field.type ?? 'text'} />
                    )}
                    {error && (
                      <p className={styles.error} id={`${field.name}-error`} role="alert">
                        <span aria-hidden="true" className={styles.errorDot} />
                        {error}
                      </p>
                    )}
                  </motion.div>
                )
              })}
              <motion.button className={styles.submit} type="submit" {...fieldMotion(1.78)}>Submit</motion.button>
              {submitted && (
                <p className={styles.notice} role="status">
                  Online messages are coming soon. Please call us.<br />
                  <a href={`tel:${contactDetails.mobile[0]}`}>+251 911 606 155</a>
                </p>
              )}
            </form>
          </div>
        </motion.section>
      </main>
      <Footer />
      <div aria-hidden="true" className="footer-reveal-spacer" />
    </div>
  )
}
