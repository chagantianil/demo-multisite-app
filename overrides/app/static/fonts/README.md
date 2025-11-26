# Custom Fonts

Place your font files in this directory.

## Supported Formats

- `.woff2` (recommended - best compression)
- `.woff` (good browser support)
- `.ttf` (fallback)
- `.otf` (fallback)

## File Naming Convention

Name your font files consistently:

```
FontName-Regular.woff2
FontName-Regular.woff
FontName-Medium.woff2
FontName-Medium.woff
FontName-SemiBold.woff2
FontName-SemiBold.woff
FontName-Bold.woff2
FontName-Bold.woff
```

## Configuration

After adding font files, update the `@font-face` declarations in:
`overrides/app/theme/foundations/styles.js`

Replace `CustomFont` with your actual font family name and update the file paths.

## Example

If your font is called "Poppins":

```
fonts/
├── Poppins-Regular.woff2
├── Poppins-Regular.woff
├── Poppins-Medium.woff2
├── Poppins-Medium.woff
├── Poppins-SemiBold.woff2
├── Poppins-SemiBold.woff
├── Poppins-Bold.woff2
└── Poppins-Bold.woff
```

Then update `styles.js`:
```js
fontFamily: 'Poppins',
src: `url('/static/fonts/Poppins-Regular.woff2') format('woff2')...`
```

And update `fonts.js`:
```js
fonts: {
    heading: '"Poppins", system-ui, sans-serif',
    body: '"Poppins", system-ui, sans-serif',
}
```

