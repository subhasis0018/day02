// Grade bands. Checked in order, so the first match wins.
const BANDS = [
  { grade: 'A', min: 90, max: 100 },
  { grade: 'B', min: 80, max: 90 },
  { grade: 'C', min: 70, max: 80 },
  { grade: 'D', min: 60, max: 70 },
  { grade: 'E', min: 40, max: 60 },
  { grade: 'Fail', min: 0, max: 40 },
]

export function calculateGrade(score) {
  const marks = Number(score)

  if (score === '' || score === null || score === undefined || Number.isNaN(marks)) {
    return { grade: 'Invalid', valid: false, reason: 'Enter a number between 0 and 100.' }
  }

  if (marks < 0 || marks > 100) {
    return { grade: 'Invalid', valid: false, reason: 'Marks must be between 0 and 100.' }
  }

  // 100 is the only score that is inclusive at the top of its band.
  const band = BANDS.find((b) => marks >= b.min && (marks < b.max || marks === 100))

  return { grade: band.grade, valid: true, marks }
}

export { BANDS }
