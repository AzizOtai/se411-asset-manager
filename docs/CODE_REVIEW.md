# AI Code Review

## Security
- No `dangerouslySetInnerHTML`, `eval`, or direct DOM injection; React escapes all rendered values. ✅
- No secrets, no network calls in Part 1. ✅
- Input is validated client-side only; **Part 2 must re-validate on the server**.
- `npm audit`: 0 vulnerabilities at time of review.

## Performance
- Filtering is memoized with `useMemo`; context value memoized. ✅
- Dataset is small; for large data add pagination/virtualization.
- Context value changes on every mutation, re-rendering all consumers – acceptable at this scale.

## Code quality
- Small, single-purpose components; logic in pure, tested utilities. ✅
- Accessible labels/roles on inputs, nav and error messages. ✅
- Improvement: `window.confirm` could be replaced by an accessible modal.

## Code reuse
- Status/type enums shared from one module; filter/validation/summary reused by pages and tests. ✅
- Improvement: extract a `<Field>` component from the form helper.

## Known limitations
- Data is not persisted (resets on reload) – by design for Part 1.
