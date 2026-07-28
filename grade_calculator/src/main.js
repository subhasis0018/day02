import './style.css'
import { calculateGrade, BANDS } from './grade.js'

document.querySelector('#app').innerHTML = `
  <main class="card">
    <h1>Grade Calculator</h1>
    <p class="subtitle">Enter marks out of 100</p>

    <form id="grade-form" novalidate>
      <input
        id="marks"
        type="number"
        step="any"
        placeholder="e.g. 87"
        autocomplete="off"
        autofocus
      />
      <button type="submit">Calculate</button>
    </form>

    <div id="result" class="result" aria-live="polite"></div>

    <table class="scale">
      <tbody>
        ${BANDS.map(
          (b) => `<tr>
            <td class="scale-grade">${b.grade}</td>
            <td class="scale-range">${b.max === 100 ? `${b.min}–100` : `${b.min}–&lt;${b.max}`}</td>
          </tr>`,
        ).join('')}
      </tbody>
    </table>
  </main>
`

const form = document.querySelector('#grade-form')
const input = document.querySelector('#marks')
const result = document.querySelector('#result')

function render() {
  const { grade, valid, reason, marks } = calculateGrade(input.value)

  result.className = `result show ${valid ? `grade-${grade.toLowerCase()}` : 'invalid'}`
  result.innerHTML = valid
    ? `<span class="grade">${grade}</span><span class="detail">${marks} marks</span>`
    : `<span class="grade">Invalid</span><span class="detail">${reason}</span>`
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  render()
})

input.addEventListener('input', () => {
  if (input.value === '') {
    result.className = 'result'
    result.innerHTML = ''
    return
  }
  render()
})
