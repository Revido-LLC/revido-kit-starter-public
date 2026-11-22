import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const workflow = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8')
const job = (name) => {
  const match = workflow.match(
    new RegExp(`^  ${name}:\\n([\\s\\S]*?)(?=^  [a-z][\\w-]*:|(?![\\s\\S]))`, 'm'),
  )
  assert.ok(match, `Missing ${name} job`)
  return match[1]
}
const expression = (block, field) => {
  const match = block.match(new RegExp(`^    ${field}: (.+)$`, 'm'))
  assert.ok(match, `Missing ${field}`)
  return match[1].replace(/^\$\{\{\s*|\s*\}\}$/g, '')
}
const evaluate = (value, event, draft) =>
  runInNewContext(value, { github: { event_name: event, event: { pull_request: { draft } } } })

test('Draft PRs fail the required check while ready PRs and protected pushes validate', () => {
  assert.match(
    workflow,
    /types: \[opened, synchronize, reopened, ready_for_review, converted_to_draft\]/,
  )
  const pending = job('draft-pending')
  const verify = job('check')
  const pendingIf = expression(pending, 'if')
  const pendingName = expression(pending, 'name')
  const verifyIf = expression(verify, 'if')
  const verifyName = expression(verify, 'name')
  assert.match(pending, /exit 1/)
  assert.match(verify, /run: pnpm check/)
  for (const [event, draft, shouldRun] of [
    ['pull_request', true, false],
    ['pull_request', false, true],
    ['pull_request', undefined, true],
    ['push', false, true],
  ]) {
    assert.equal(Boolean(evaluate(verifyIf, event, draft)), shouldRun)
    assert.equal(Boolean(evaluate(pendingIf, event, draft)), !shouldRun)
    if (!shouldRun) assert.equal(evaluate(pendingName, event, draft), 'check')
    if (shouldRun) assert.equal(evaluate(verifyName, event, draft), 'check')
  }
})
