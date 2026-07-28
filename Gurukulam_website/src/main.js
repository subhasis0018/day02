import './style.css'

const modal = document.querySelector('.application-modal')
const menuButton = document.querySelector('.menu-toggle')
const nav = document.querySelector('.primary-nav')
const openApplication = () => {
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('no-scroll')
  document.querySelector('.modal-close').focus()
}
const closeApplication = () => {
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('no-scroll')
}

document.querySelectorAll('[data-open-application]').forEach((button) => button.addEventListener('click', openApplication))
document.querySelectorAll('[data-close-application]').forEach((button) => button.addEventListener('click', closeApplication))

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeApplication()
})

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open')
  menuButton.classList.toggle('is-open', isOpen)
  menuButton.setAttribute('aria-expanded', String(isOpen))
})

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open')
  menuButton.classList.remove('is-open')
  menuButton.setAttribute('aria-expanded', 'false')
}))

const revealElements = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
revealElements.forEach((element) => observer.observe(element))
